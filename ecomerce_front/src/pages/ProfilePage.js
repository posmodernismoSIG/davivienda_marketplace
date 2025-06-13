import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tab, Tabs } from 'react-bootstrap';
import { FaUser, FaLock, FaCheckCircle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../store/slices/authSlice';
import { toast } from 'react-toastify';

const profileSchema = yup.object({
  first_name: yup.string().required('El nombre es requerido'),
  last_name: yup.string().required('El apellido es requerido'),
  email: yup.string().email('Email inválido').required('El email es requerido'),
  phone: yup.string().required('El teléfono es requerido'),
  address: yup.string(),
  birth_date: yup.string(),
});

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [activeKey, setActiveKey] = useState('profile');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      birth_date: user?.birth_date || '',
    },
  });

  React.useEffect(() => {
    if (user) {
      reset({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        birth_date: user.birth_date || '',
      });
    }
  }, [user, reset]);

  const onSubmitProfile = async (data) => {
    try {
      await dispatch(updateUserProfile(data)).unwrap();
      toast.success('Perfil actualizado exitosamente');
    } catch (error) {
      toast.error('Error al actualizar el perfil');
    }
  };

  const getProfileCompletion = () => {
    if (!user) return 0;
    const fields = ['first_name', 'last_name', 'email', 'phone', 'address'];
    const completedFields = fields.filter(field => user[field]);
    return Math.round((completedFields.length / fields.length) * 100);
  };

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h2 className="mb-4">
            <FaUser className="me-2" />
            Mi Perfil
          </h2>
        </Col>
      </Row>

      <Row>
        <Col lg={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <div className="mb-3">
                <div 
                  className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                  style={{ width: '80px', height: '80px', fontSize: '2rem' }}
                >
                  {user?.first_name?.charAt(0) || user?.username?.charAt(0) || 'U'}
                </div>
              </div>
              <h5>{user?.first_name} {user?.last_name}</h5>
              <p className="text-muted mb-3">{user?.email}</p>
              
              <div className="mb-3">
                <small className="text-muted">Perfil Completado</small>
                <div className="progress mt-1" style={{ height: '8px' }}>
                  <div 
                    className="progress-bar" 
                    style={{ width: `${getProfileCompletion()}%` }}
                  />
                </div>
                <small className="text-muted">{getProfileCompletion()}%</small>
              </div>
              
              {user?.is_verified && (
                <Alert variant="success" className="py-2 small">
                  <FaCheckCircle className="me-1" />
                  Cuenta Verificada
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card>
            <Card.Body>
              <Tabs activeKey={activeKey} onSelect={setActiveKey} className="mb-4">
                <Tab eventKey="profile" title="Información Personal">
                  <Form onSubmit={handleSubmit(onSubmitProfile)}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Nombre</Form.Label>
                          <Form.Control
                            type="text"
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
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        {...register('email')}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Teléfono</Form.Label>
                          <Form.Control
                            type="tel"
                            {...register('phone')}
                            isInvalid={!!errors.phone}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.phone?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Fecha de Nacimiento</Form.Label>
                          <Form.Control
                            type="date"
                            {...register('birth_date')}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label>Dirección</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        {...register('address')}
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="primary"
                      disabled={loading}
                    >
                      {loading ? 'Actualizando...' : 'Actualizar Perfil'}
                    </Button>
                  </Form>
                </Tab>

                <Tab eventKey="security" title="Seguridad">
                  <Alert variant="info">
                    <FaLock className="me-2" />
                    Para cambiar tu contraseña, contacta con nuestro soporte.
                  </Alert>
                  
                  <div className="mt-4">
                    <h6>Información de Cuenta</h6>
                    <p><strong>Usuario:</strong> {user?.username}</p>
                    <p><strong>Fecha de registro:</strong> {new Date(user?.date_joined).toLocaleDateString()}</p>
                    <p><strong>Estado:</strong> {user?.is_verified ? 'Verificado' : 'Pendiente de verificación'}</p>
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
