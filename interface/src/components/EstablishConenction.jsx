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

const EstablishConenction = ({
  setConnectionId,
  setActiveStep,
  isVerifier,
}) => {
  const [connectionQrCode, setConnectionQrCode] = useState(null);
  const [oobId, setOobId] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const router = useRouter();
  // const []
  const generateQR = async () => {
    try {
      const baseUrl = isVerifier ? process.env.NEXT_PUBLIC_VERIFIER_API_URL : process.env.NEXT_PUBLIC_API_URL
      const response = await axios.post(
        `${baseUrl}/create-invitation`,
        {
          label: isVerifier ? "Verifier" : "Issuer",
          alias: isVerifier ? "Verifier" : "Issuer",
          domain: `${process.env.NEXT_PUBLIC_API_URL}`,
        }
      );
      setOobId(response.data.invitation.id);
      QRCode.toDataURL(
        response.data.invitationUrl,
        {
          color: {
            dark: "#000000",
            light: "#f3f4f6",
          },
        },
        function (err, data) {
          if (err) throw err;
          setConnectionQrCode(data);
        }
      );
      return response.data.invitation.id;
    } catch (error) {
      console.log("Error creating invitation:", error.message);
      return null;
    }
  };

  const getConnectionStatus = async (outOfBandId) => {
    try {
      const baseUrl = isVerifier ? process.env.NEXT_PUBLIC_VERIFIER_API_URL : process.env.NEXT_PUBLIC_API_URL
      const response = await axios.get(
        `${baseUrl}/connections?outOfBandId=${outOfBandId}`
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
    const intervalId = setInterval(async () => {
      try {
        if (oobId) {
          const resp = await getConnectionStatus(oobId);
          if (resp.data.length > 0) {
            const state = resp.data[0].state;
            const id = resp.data[0].id;
            if (state === "completed") {
              console.log(id);
              isVerifier
                ? localStorage.setItem("verifier_connection_id", id)
                : localStorage.setItem("issuer_connection_id", id);
              setConnectionId(id);
              setActiveStep((prev) => prev + 1);
              clearInterval(intervalId);
              clearTimeout(timeoutId);
            }
          }
        }
      } catch (error) {
        console.log(error);
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
      if (oobId === null) await generateQR();
      if (oobId) {
        const cleanup = connectionStatusCheck(oobId);
        return cleanup;
      }
    })();
  }, [oobId]);

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
      <Card className="w-full max-w-[64rem] h-[32rem] flex-row mx-auto mt-40">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-3/5 shrink-0 rounded-r-none bg-gray-100"
        >
          {connectionQrCode && !showLoading ? (
            <>
              <div
                id="qr-code"
                style={{ marginBottom: "30px" }}
                className=" flex justify-center p-4 bg-gray-100"
              >
                <Image
                  src={connectionQrCode}
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
            <div className="flex flex-col justify-center items-center h-full">
              <div className="mb-6">
                <Loading />
              </div>
              <div className="text-center text-gray-800">
                <h1 className="text-lg font-semibold mb-2">
                  Scanning is completed
                </h1>
                <h2 className="text-base">
                  Please wait. We are setting up a connection with your mobile
                  wallet
                </h2>
              </div>
            </div>
          )}
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            Let's connect with a {isVerifier ? "verifier" : "issuer"}
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Scan the QR code to connect
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            Scan the QR code displayed on the left side to connect with a
            {isVerifier ? "verifier" : "issuer"}. After successful connection,
            you will be able to chat with the{" "}
            {isVerifier ? "verifier" : "issuer"} through this wallet.{" "}
            {isVerifier
              ? "This Verifier will ask for a proof of the previously issued certificate in the next phase. If you do not have any credential, please obtain one from issuer."
              : "This Issuer will provide you a certificate in the next phase"}
          </Typography>
        </CardBody>
      </Card>
    </>
  );
};

export default EstablishConenction;
