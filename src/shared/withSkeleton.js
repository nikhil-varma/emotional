import React from "react";
import Skeleton from "react-loading-skeleton";

export const withSkeleton = (WrappedComponent) => {
  const SkeletizedComponent = (props) => {
    const { isLoading } = props;
    return (
      <>
        {isLoading ? (
          <div className="skeleton-loading">
            <Skeleton />
          </div>
        ) : (
          <WrappedComponent {...props} />
        )}
      </>
    );
  };
  return SkeletizedComponent;
};
