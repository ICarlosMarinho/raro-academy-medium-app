import { Button } from "../Button";
import { Input } from "../Input";

export const Login = () => {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://rarolabs.com.br/assets/logo-cae9beb1976500005b5e29dea19bdaa2761082232703a16beb71ffd2117014e5.png"
            alt="Workflow"
          />
        </div>
        <form className="mt-8 space-y-6" action="#">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mt-5">
              <Input type="text" id="login" label="Login" placeholder="login" required />
            </div>

            <div className="mt-5">
              <Input type="password" id="senha" label="senha" placeholder="********" required />
            </div>
          </div>
          <div>
            <Button type="submit">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
