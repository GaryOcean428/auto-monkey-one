import { Suspense, lazy, ComponentType } from "react";
import { Loader2 } from "lucide-react";

export function withLazyLoading<T extends object>(
  Component: ComponentType<T>,
  fallback?: React.ReactNode,
) {
  const LazyComponent = lazy(() => import(`../components/${Component.name}`));

  return function LazyLoadedComponent(props: T) {
    return (
      <Suspense fallback={fallback || <DefaultFallback />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

function DefaultFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[100px]">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  );
}
