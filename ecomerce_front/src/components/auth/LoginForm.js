// import React, { useState } from 'react';
// import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
// import { FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser, clearError } from '../../store/slices/authSlice';
// import { toast } from 'react-toastify';

// const schema = yup.object({
//   username: yup.string().required('El usuario es requerido'),
//   password: yup.string().required('La contraseña es requerida'),
// });

// const LoginForm = ({ onSuccess }) => {
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.auth);
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       const result = await dispatch(loginUser(data)).unwrap();
//       toast.success('¡Bienvenido!');
//       if (onSuccess) onSuccess();
//     } catch (error) {
//       console.error('Login error:', error);
//     }
//   };

//   React.useEffect(() => {
//     return () => {
//       dispatch(clearError());
//     };
//   }, [dispatch]);

//   return (
//     <Form onSubmit={handleSubmit(onSubmit)}>
//       {error && (
//         <Alert variant="danger" className="mb-3">
//           {typeof error === 'string' ? error : 'Error en el inicio de sesión'}
//         </Alert>
//       )}

//       <Form.Group className="mb-3">
//         <Form.Label>Usuario</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Ingresa tu usuario"
//           {...register('username')}
//           isInvalid={!!errors.username}
//         />
//         <Form.Control.Feedback type="invalid">
//           {errors.username?.message}
//         </Form.Control.Feedback>
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Contraseña</Form.Label>
//         <div className="position-relative">
//           <Form.Control
//             type={showPassword ? 'text' : 'password'}
//             placeholder="Ingresa tu contraseña"
//             {...register('password')}
//             isInvalid={!!errors.password}
//           />
//           <Button
//             variant="link"
//             className="position-absolute top-50 end-0 translate-middle-y border-0"
//             style={{ zIndex: 5 }}
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </Button>
//         </div>
//         <Form.Control.Feedback type="invalid">
//           {errors.password?.message}
//         </Form.Control.Feedback>
//       </Form.Group>

//       <Row className="mb-3">
//         <Col>
//           <Form.Check 
//             type="checkbox" 
//             label="Recordarme" 
//           />
//         </Col>
//         <Col className="text-end">
//           <a href="/forgot-password" className="text-decoration-none">
//             ¿Olvidaste tu contraseña?
//           </a>
//         </Col>
//       </Row>

//       <Button
//         variant="primary"
//         type="submit"
//         disabled={loading}
//         className="w-100 mb-3"
//         size="lg"
//       >
//         {loading ? (
//           <>
//             <span className="spinner-border spinner-border-sm me-2" />
//             Iniciando sesión...
//           </>
//         ) : (
//           <>
//             <FaSignInAlt className="me-2" />
//             Iniciar Sesión
//           </>
//         )}
//       </Button>

//       <div className="text-center">
//         <small className="text-muted">
//           ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
//         </small>
//       </div>
//     </Form>
//   );
// };

// export default LoginForm;


import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../store/slices/authSlice';
import { toast } from 'react-toastify';

const schema = yup.object({
  username: yup.string().required('El usuario es requerido'),
  password: yup.string().required('La contraseña es requerida'),
});

const LoginForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // CORRECCIÓN: Remover la variable 'result' no usada
      await dispatch(loginUser(data)).unwrap();
      toast.success('¡Bienvenido!');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Login error:', error);
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
          {typeof error === 'string' ? error : 'Error en el inicio de sesión'}
        </Alert>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Usuario</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa tu usuario"
          {...register('username')}
          isInvalid={!!errors.username}
        />
        <Form.Control.Feedback type="invalid">
          {errors.username?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <div className="position-relative">
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder="Ingresa tu contraseña"
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

      <Row className="mb-3">
        <Col>
          <Form.Check 
            type="checkbox" 
            label="Recordarme" 
          />
        </Col>
        <Col className="text-end">
          <a href="/forgot-password" className="text-decoration-none">
            ¿Olvidaste tu contraseña?
          </a>
        </Col>
      </Row>

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
            Iniciando sesión...
          </>
        ) : (
          <>
            <FaSignInAlt className="me-2" />
            Iniciar Sesión
          </>
        )}
      </Button>

      <div className="text-center">
        <small className="text-muted">
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </small>
      </div>
    </Form>
  );
};

export default LoginForm;