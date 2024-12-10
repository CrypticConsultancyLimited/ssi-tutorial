// components/ScanQR.js
"use client";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import getStarted from "../../public/get-started.json";
import Lottie from "lottie-react";
const ConnenctionWithVerifier = ({ setActiveStep }) => {
  const [connectionQrCode, setConnectionQrCode] = useState(null);
  const [oobId, setOobId] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const router = useRouter();
  // const []
  const generateQR = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ISSUER_API}/agent/create-invitation`,
        { domain: `${process.env.NEXT_PUBLIC_ISSUER_API}` }
      );
      console.log(
        "invitation data",
        response.data.invitation,
        response.data.invitation.invitation.id,
        response.data.invitation.invitationUrl
      );
      //   setInvitationUrl(response.data.invitation.invitationUrl)
      QRCode.toDataURL(
        response.data.invitation.invitationUrl,
        function (err, data) {
          if (err) throw err;
          setConnectionQrCode(data);
        }
      );
      return response.data.invitation.invitation.id;
    } catch (error) {
      console.log("Error registering user:", error.message);
      return null;
    }
  };

  const getConnectionStatus = async (outOfBandId) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ISSUER_API}/agent/connection-status`,
        { outOfBandId }
      );
      console.log(response);

      return response;
    } catch (error) {
      console.log("Error getting connection status:", error.message);

      return null;
    }
  };
  const connectionStatusCheck = (oobId) => {
    let timeoutId = null;
    console.log(oobId);
    const intervalId = setInterval(async () => {
      try {
        if (oobId) {
          const resp = await getConnectionStatus(oobId);
          console.log(resp);
          if (resp.data.status === "completed") {
            localStorage.setItem("conId", resp.data.connectionId);
            setActiveStep(1);
            clearInterval(intervalId);
            clearTimeout(timeoutId);
          }
        }
      } catch (error) {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      }
    }, 2000);

    timeoutId = setTimeout(async () => {
      clearInterval(intervalId);
      router.push("/");
    }, 180000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  };

  useEffect(() => {
    (async () => {
      const oobId = await generateQR();
      console.log("oobId", oobId);
      if (oobId) {
        const cleanup = connectionStatusCheck(oobId);
        return cleanup;
      }
    })();
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  return (
    <>
      <Card className="w-full max-w-[64rem] flex-row mx-auto mt-40">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-3/5 shrink-0 rounded-r-none bg-gray-100"
        >
          {!connectionQrCode && !showLoading ? (
            <>
              <div
                id="qr-code"
                style={{ marginBottom: "30px" }}
                className=" flex justify-center p-4"
              >
                <Image
                  src="/qr-code.svg"
                  alt="qr code"
                  width={400}
                  height={400}
                />
              </div>
              <div className="text-center text-red-500 mb-4 text-[20px]">
                Remaining time : {formatTime(timeLeft)}
              </div>
            </>
          ) : (
            <>
              <Loading />
              <div className="text-center text-gray-800 mb-4 text-[20px]">
                <h1>Scanning is completed</h1>
                <h2>
                  Please wait. We are setting up connection with your mobile
                  wallet
                </h2>
              </div>
            </>
          )}
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            Let's connect with a Verifier
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Scan the QR code to connect
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            Scan the QR code displayed on the left side to connect with a
            issuer. After successful connection, you will be able to chat with
            the verifer through this wallet. This verifier will ask for a proof of the
            certificate in the wallet.
          </Typography>
        </CardBody>
      </Card>
    </>
  );
};

export default ConnenctionWithVerifier;
