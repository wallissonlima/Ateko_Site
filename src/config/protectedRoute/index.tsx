import { useEffect, useState } from "react";
import Loading from "../../components/loading";

interface RouterAuthenticationProps {
  roles?: string;
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<RouterAuthenticationProps> = ({
  component: Component,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checked_routed();
  }, []);

  const checked_routed = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false); // Define isLoading como false após a verificação ser concluída
    }, 4000);
  };

  return (
    <>
      {isLoading && (
        <div className="loading_overlay">
          <Loading />
        </div>
      )}

      <div style={{ visibility: isLoading ? "hidden" : "visible" }}>
        <Component {...props} /> {/* Renderiza o componente com os dados */}
      </div>
    </>
  );
};

export default ProtectedRoute;
