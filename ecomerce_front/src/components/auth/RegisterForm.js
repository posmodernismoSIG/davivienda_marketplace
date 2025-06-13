import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../../store/slices/authSlice';
import { toast } from 'react-toastify';

const schema = yup.object({
  username: yup
    .string()
    .required('El usuario es requerido')
    .min(3, 'El usuario debe tener al menos 3 caracteres'),
  email: yup
    .string()
    .required('El email es requerido')
    .email('Ingresa un email válido'),
  first_name: yup.string().required('El nombre es requerido'),
  last_name: yup.string().required('El apellido es requerido'),
  phone: yup.string().required('El teléfono es requerido'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  re_password: yup
    .string()
    .required('Confirma tu contraseña')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
});

const RegisterForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      toast.success('¡Registro exitoso! Ahora puedes iniciar sesión.');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  React.useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert variant="danger" className="mb-3">
          {typeof error === 'object' 
            ? Object.values(error).flat().join(', ')
            : error || 'Error en el registro'
          }
        </Alert>
      )}

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre"
              {...register('first_name')}
              isInvalid={!!errors.first_name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.first_name?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu apellido"
              {...register('last_name')}
              isInvalid={!!errors.last_name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.last_name?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Usuario</Form.Label>
        <Form.Control
          type="text"
          placeholder="Elige un nombre de usuario"
          {...register('username')}
          isInvalid={!!errors.username}
        />
        <Form.Control.Feedback type="invalid">
          {errors.username?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingresa tu email"
          {...register('email')}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control
          type="tel"
          placeholder="+57 300 123 4567"
          {...register('phone')}
          isInvalid={!!errors.phone}
        />
        <Form.Control.Feedback type="invalid">
          {errors.phone?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Crea una contraseña"
                {...register('password')}
                isInvalid={!!errors.password}
              />
              <Button
                variant="link"
                className="position-absolute top-50 end-0 translate-middle-y border-0"
                style={{ zIndex: 5 }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirma tu contraseña"
                {...register('re_password')}
                isInvalid={!!errors.re_password}
              />
              <Button
                variant="link"
                className="position-absolute top-50 end-0 translate-middle-y border-0"
                style={{ zIndex: 5 }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
            <Form.Control.Feedback type="invalid">
              {errors.re_password?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Check 
          type="checkbox" 
          label="Acepto los términos y condiciones"
          required
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        disabled={loading}
        className="w-100 mb-3"
        size="lg"
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" />
            Registrando...
          </>
        ) : (
          <>
            <FaUserPlus className="me-2" />
            Registrarse
          </>
        )}
      </Button>

      <div className="text-center">
        <small className="text-muted">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
        </small>
      </div>
    </Form>
  );
};

export default RegisterForm;

