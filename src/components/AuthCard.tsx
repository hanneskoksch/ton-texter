import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import AuthForm from "@/components/AuthForm"; 

const AuthCard = () => {
  return (
    <Card className="max-w-[400px] mt-8">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">Login & Sign Up</p>
          <p className="text-small text-default-500">Get started now. It is time to transcribe.</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="col-6 auth-widget">
          <p className="text-small text-default-500">
            Login with a magic link. No password required!
          </p>
          <AuthForm />
        </div>
      </CardBody>
    </Card>
  );
};

export default AuthCard;
