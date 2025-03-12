import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button, Typography, Row, Col, Image } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, LoadingOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import MigrationCarousel from "../components/MigrationCarousel";
import "../styles/login.css";
import Snackbar from "../components/Snackbar";
import AtgLogo from "../assets/logo/AtgeirLogo.svg";
import { LABELS } from "../constants/labels";
import { useDispatch } from "react-redux";
import { checkUserExists, registerUser } from "../redux/slice/authenticationSlice";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const SECRET_KEY=import.meta.env.VITE_REACT_APP_SECRET_KEY
import CryptoJS from "crypto-js";

const { Title, Text } = Typography;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canvasRef = useRef(null);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let snowflakes = [];
    const numFlakes = 30;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createSnowflakes = () => {
      snowflakes = Array.from({ length: numFlakes }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 2,
        speedY: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        opacity: Math.random() * 0.7 + 0.3,
      }));
    };
    createSnowflakes();

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(87, 128, 130, 0.8)";
      ctx.font = "18px Arial";

      snowflakes.forEach((flake) => {
        ctx.globalAlpha = flake.opacity;
        ctx.fillText("❄", flake.x, flake.y);

        flake.y += flake.speedY;
        flake.x += flake.speedX;

        if (flake.y > canvas.height) {
          flake.y = -10;
          flake.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(update);
    };
    update();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);



  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

//   const onFinish = async (values) => {
//     setIsSubmitting(true);
//     try {
//         const checkResponse = await dispatch(checkUserExists({ email: values.email })).unwrap();
//         const userExists = checkResponse.length > 0;

//         if (isLogin) {
//           if (!userExists) {
//               Snackbar("error", "User does not exist. Please register first.");
//               setIsSubmitting(false);
//               return;
//           }
      
//           const userType = checkResponse[0]?.type;
      
//           if (userType === "$GOOGLEUSER$") {
//               Snackbar("error", "Please login using Google as you registered with Google.");
//               setIsSubmitting(false);
//               return;
//           }

//           const encryptedPassword = checkResponse[0]?.password;
      
//           if (!encryptedPassword) {
//               Snackbar("error", "Password not found. Please contact support.");
//               setIsSubmitting(false);
//               return;
//           }
      

//           let decryptedPassword;
//           try {
//               const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
//               decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
//               localStorage.setItem("authentication", values.email);
              
//           } catch (error) {
//               console.error("Password decryption failed:", error);
//               Snackbar("error", "Failed to verify password. Please try again.");
//               setIsSubmitting(false);
//               return;
//           }
      
//           // Compare decrypted password with user input
//           if (decryptedPassword !== values.password) {
//               Snackbar("error", "Invalid password. Please try again.");
//               setIsSubmitting(false);
//               return;
//           }
      
//           localStorage.setItem("authentication", values.email);
//           Snackbar("success", "Login Successful");
//           navigate("/home");
//       }
      
//         else {
//             if (userExists) {
//                 Snackbar("error", "User already exists. Please login instead.");
//                 setIsSubmitting(false);
//                 return;
//             }
//             const encryptedPassword = CryptoJS.AES.encrypt(values.password, SECRET_KEY).toString();

//             const payload = {
//                 email: values.email,
//                 password: encryptedPassword,  
//                 type: '$EMAILUSER$',
//                 config: "default-config",
//                 status: true,
//             };
            

//             await dispatch(registerUser(payload)).unwrap();
//             localStorage.setItem("userData", {given_name:values.username});
//             Snackbar("success", "Registration Successful. Please login.");
//             navigate("/login");  
//         }
//     } catch (error) {
//         console.error("Failed to process:", error);
//         Snackbar("error", error || "Something went wrong.");
//         setIsSubmitting(false);
//     }
// };

const onFinish = async (values) => {
  setIsSubmitting(true);

  try {
      const checkResponse = await dispatch(checkUserExists({ email: values.email })).unwrap();
      const userExists = checkResponse.length > 0;

      if (isLogin) {
          if (!userExists) {
              Snackbar("error", "User does not exist. Please register first.");
              setIsSubmitting(false);
              return;
          }

          const userType = checkResponse[0]?.type;
          if (userType === "$GOOGLEUSER$") {
              Snackbar("error", "Please login using Google as you registered with Google.");
              setIsSubmitting(false);
              return;
          }

          const encryptedPassword = checkResponse[0]?.password;
          if (!encryptedPassword) {
              Snackbar("error", "Password not found. Please contact support.");
              setIsSubmitting(false);
              return;
          }

          let decryptedPassword;
          try {
              const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
              decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
          } catch (error) {
              Snackbar("error", "Failed to verify password. Please try again.");
              setIsSubmitting(false);
              return;
          }

          if (decryptedPassword !== values.password) {
              Snackbar("error", "Invalid password. Please try again.");
              setIsSubmitting(false);
              return;
          }

          localStorage.setItem("authentication", values.email);
          Snackbar("success", "Login Successful");

          setTimeout(() => {
              navigate("/home");
          }, 1500); 
      } 
      else {
          if (userExists) {
              Snackbar("error", "User already exists. Please login instead.");
              setIsSubmitting(false);
              return;
          }

          const encryptedPassword = CryptoJS.AES.encrypt(values.password, SECRET_KEY).toString();
          const payload = {
              email: values.email,
              password: encryptedPassword,
              type: '$EMAILUSER$',
              config: "default-config",
              status: true,
          };

          await dispatch(registerUser(payload)).unwrap();
          Snackbar("success", "Registration Successful. Redirecting to login...");
          localStorage.setItem("userData", JSON.stringify({ given_name: values.username }));
          setTimeout(() => {
            form.resetFields();
              setIsLogin(true); 
              setIsSubmitting(false);
          }, 1500);
      }
  } catch (error) {
      Snackbar("error", error || "Something went wrong.");
      setIsSubmitting(false);
  }
};

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const decodedToken = jwtDecode(credentialResponse.credential);
    const email = decodedToken.email.toLowerCase().trim();

    try {
        const checkResponse = await dispatch(checkUserExists({ email })).unwrap();

        const userExists = checkResponse.length > 0;

        if (userExists) {
            const userType = checkResponse[0]?.type;
            if (userType !== "$GOOGLEUSER$") {
                Snackbar("error", "You registered using email/password. Please login using your email.");
                return;
            }
        }

        const payload = {
            email,
            password: "NA",
            type: "$GOOGLEUSER$",  
            config: JSON.stringify({ name: decodedToken.name, picture: decodedToken.picture }), 
            status: true,
        };

        await dispatch(registerUser(payload)).unwrap();
        Snackbar("success", "Google Login Successful");
        localStorage.setItem("authentication", email);
        localStorage.setItem(
          "userData",
          JSON.stringify(decodedToken)
        );
        navigate("/home");
    } catch (error) {
        console.error("Google Login Failed:", error);
        Snackbar("error", error);
    }
};


  return (
    <>
      <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none" }} />;
      <div className="login-page">
        <div className="blob-left"></div>
        <div className="background-container">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="blob-right">
            <path fill="#F5CAC2" d="M49.8,-28.1C61.2,-8.9,64.9,15.3,55.3,36.1C45.7,56.9,22.9,74.2,0.3,74C-22.2,73.8,-44.4,56.1,-50.3,37.4C-56.2,18.8,-45.8,-0.8,-34.7,-19.9C-23.6,-38.9,-11.8,-57.3,3.7,-59.4C19.2,-61.5,38.3,-47.3,49.8,-28.1Z" transform="translate(100 100)" />
          </svg>
        </div>
        <Image
          style={{ position: "fixed", top: "0px", left: "20px", height: "12%", width: "12%" }}
          src={AtgLogo}
        />
        <Row className="login-wrapper">
        <Col xs={24} sm={12} md={12} lg={12} xl={12} className="carousel-container">
            <MigrationCarousel />
          </Col>

          <Col xs={24} sm={12} md={8} lg={8} xl={8} className={isLogin ? "login" : "register"}>

            {isLogin ? (
              <>
                <Title level={2}>{LABELS.SIGN_IN}</Title>
                <Form
                 form={form}
                  name="login-form"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="form"
                >
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please enter your email!" },
                      { type: "email", message: "Invalid email format!" }
                    ]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Enter your email" className="custom-input" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      { required: true, message: "Please enter your password!" },
                      {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
                      },
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" block className="custom-btn" disabled={isSubmitting}>
                    {isSubmitting && <LoadingOutlined />} {LABELS.LOGIN}
                    </Button>
                  </Form.Item>
                </Form>
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => Snackbar("error", "Google Login Failed")}
                />

                <Text type="secondary">
                  {LABELS.DONT_HAVE_A_ACCOUNT} <Link onClick={toggleForm}>{LABELS.LOGIN_TEXT_CREATE_ACCOUNT}!</Link>
                </Text>

              </>
            ) : (
              <>
                <Title level={2}>{LABELS.LOGIN_TEXT_CREATE_ACCOUNT}</Title>
                <Form
                 form={form}
                  name="register_form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  layout="vertical"
                  className="form"
                >
                  <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                      { required: true, message: "Please enter your username!" },
                      { min: 3, message: "Username must be at least 3 characters long!" },
                    ]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Enter your username" className="custom-input" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please enter your email!" },
                      { type: "email", message: "Invalid email format!" },
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="Enter your email" className="custom-input" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      { required: true, message: "Please enter your password!" },
                      {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
                      },
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
                  </Form.Item>

                  <Form.Item
                    name="confirm_password"
                    label="Confirm Password"
                    dependencies={["password"]}
                    rules={[
                      { required: true, message: "Please confirm your password!" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error("The two passwords do not match!"));
                        },
                      }),
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Confirm your password" />
                  </Form.Item>

                  <Form.Item>
                    <Button htmlType="submit" block className="custom-btn" disabled={isSubmitting}>
                    {isSubmitting && <LoadingOutlined />} {LABELS.LOGIN_TEXT_CREATE_ACCOUNT}
                    </Button>
                  </Form.Item>
                </Form>
             

                <div style={{ textAlign: 'center' }}>
                  <Text type="secondary">
                    Already have an account? <Link onClick={toggleForm}>Login!</Link>
                  </Text>
                </div>
              </>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
