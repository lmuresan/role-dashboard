import React, { FunctionComponent } from "react";

import "./Loading.scss";

export type LoadingProps = {};

const Loading: FunctionComponent<LoadingProps> = () => {
  return (
    <>
      <div className="loading">
        <div>Loading</div>
      </div>
    </>
  );
};

export default Loading;
