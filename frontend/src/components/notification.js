import React from 'react';
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DefaultButton from './defaultButton';

function Notification(props) {
  const card = props.type ? "notification__card--right":"notification__card--wrong";
  const iconClass = props.type ? "icon__notification--right":"icon__notification--wrong";
  const icon = props.type ? faCheckCircle:faTimesCircle;
  const text = props.type ? "You're right!":"You're wrong!";

  const action = () => {
    props.action()
    props.setNotificationStatus(false)
  }

  const renderNotification = () => {
    if(props.status){
      return (
        <div className="notification__container">

          <div className={card}>
            <FontAwesomeIcon className={iconClass} icon={icon}/>
            <h3>{text}</h3>
            <DefaultButton iconBefore={true} action={action} text={"Next"}/>

          </div>
        </div>
      )
    }
  }
  
  return (
    <>
    {renderNotification()}
    </>
  );
}

export default Notification;
