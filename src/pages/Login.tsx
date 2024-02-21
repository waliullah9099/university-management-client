import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/feather/auth/authApi";
import { useAppDispatch } from "../redux/feather/hook";
import { TUserType, setUser } from "../redux/feather/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PhForm from "../components/form/PhForm";
import PhInput from "../components/form/PhInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const defaultValues = {
    id: "A-0002",
    password: "admin123",
  };

  const [login] = useLoginMutation();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading in");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUserType;
      console.log(user);

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("User Login Successfully", { id: toastId, duration: 1000 });
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error("something went wrong", { id: toastId, duration: 1000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ display: "100vh" }}>
      <PhForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PhInput type="text" name="id" label="Id" />
        <PhInput type="text" name="password" label="Password" />
        <Button htmlType="submit">Submit</Button>
      </PhForm>
    </Row>
  );
};

export default Login;
