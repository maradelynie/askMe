import React from 'react';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useHistory} from 'react-router-dom'

import "./close.scss";

function Close() {
  const history = useHistory();
 
  return (
    <div onClick={() => history.push("/")}  className="close__content">
      <FontAwesomeIcon className="icon__close" icon={faTimes}/> Close
    </div>
  );
}

export default Close;
