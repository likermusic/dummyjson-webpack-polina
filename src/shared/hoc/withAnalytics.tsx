import { ComponentType, useEffect } from "react";

export function withAnalytics<P extends object>(Component: ComponentType<P>) {
  return function WrappedComponent(props: P) {
    useEffect(() => {
      console.log("Здесь может быть код для отправки аналитики");
      console.log("...или для сохранения каких-л куки");
      fetch("/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: "some data" }),
      });
    }, []);

    return <Component {...props} />;
  };
}
