import { PropsWithChildren } from 'react';
import signupImage from '/public/signup.png';
import loginImage from '/public/loginImage.png';

export enum AuthType {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

type AuthLayoutProps = {
  type: AuthType;
};

const imageMap: Record<AuthType, string> = {
  [AuthType.LOGIN]: loginImage,
  [AuthType.SIGNUP]: signupImage,
};

const AuthLayout = ({ type, children }: PropsWithChildren<AuthLayoutProps>) => {
  const imageSrc = imageMap[type];
  const imageDivClass = type === AuthType.LOGIN ? 'md:w-1/3' : 'md:w-1/2'; // 💡 1/5 → 1/3

  return (
    <div className="min-h-screen flex justify-center items-center bg-item-background px-4">
      <div className="text-white rounded-lg shadow-md w-full max-w-6xl flex flex-col md:flex-row p-6 md:p-10">
        <div className={`flex flex-col justify-center items-center hidden md:flex ${imageDivClass}`}>
          <img src={imageSrc} alt={`${type} illustration`} className="w-3/4 md:w-full" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
