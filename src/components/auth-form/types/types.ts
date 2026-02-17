export type AuthCredentials = {
  email: string;
  password: string;
};

export type AuthFormProps = {
  onSubmit: (credentials: AuthCredentials) => void;
  title?: string;
  subtitle?: string;
  submitLabel?: string;
  isLoading?: boolean;
  error?: string | null;
};
