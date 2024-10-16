import { BASE_URL } from "@/shared/constants";
import { FC } from "react";

interface Props {
  code: string;
}

const VerificationUserTemplate: FC<Props> = ({ code }) => (
  <div>
    <p>
      Код подтверждения: <h2>{code}</h2>
    </p>

    <p>
      <a href={`${BASE_URL}/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a>
    </p>
  </div>
);

export default VerificationUserTemplate;
