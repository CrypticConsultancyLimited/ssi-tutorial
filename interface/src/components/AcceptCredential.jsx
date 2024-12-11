import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import acceptCred from "../../public/accept-cred.json";
import Lottie from "lottie-react";
import axios from "axios";
function AcceptCredential({ setActiveStep, connectionId }) {
  const [issued, setIssued] = useState(false);
  const requestSentRef = useRef(false);
  const issueCredential = async () => {
    if (requestSentRef.current) return; // Prevent duplicate calls in development mode
    requestSentRef.current = true;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/issue-credential`,
        {
          connectionId: connectionId,
        }
      );
      console.log(response);
    } catch (error) {
      console.log("Error creating invitation:", error.message);
    }
  };

  useEffect(() => {
    console.log(localStorage.getItem("issuer_connection_id"));
    issueCredential();
  }, [connectionId]);
  return (
    <Card className="w-full max-w-[48rem] flex-row mx-auto mt-60">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none bg-gray-100"
      >
        <Lottie
          animationData={acceptCred}
          loop={true}
          autoplay={true}
          className="w-80 h-80 ml-[-60px]"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          You are connected with an issuer
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          Accept Credential In Your Wallet
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          The issuer has sent you a credential to your bifold wallet. Please
          accept the credential. You will be able to use this credential as
          certificate to verify yourself to some other organizations.
        </Typography>
        {/* <div>
            Certificate 

        </div> */}
      </CardBody>
      <Button
        onClick={() => setActiveStep(3)}
        variant="btn"
        className="flex items-center  text-white text-[12px] w-[120px] pl-2"
      >
        Next
        <img
          src="/right.svg"
          alt="Icon"
          width="20"
          height="20"
          className="ml-2"
        />
      </Button>
    </Card>
  );
}

export default AcceptCredential;
