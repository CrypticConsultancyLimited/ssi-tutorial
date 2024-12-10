import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import waiting from "../../public/waiting-animation.json";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
  Input,
} from "@material-tailwind/react";
import acceptCred from "../../public/accept-credential.json";
import axios from "axios";
import Image from "next/image";
const ShareProof = ({ setActiveStep, connectionId }) => {
  const [department, setDepartment] = useState("");
  const [predicateValue, setPredicateValue] = useState("");

  const requestSentRef = useRef(false);

  const proofRequestHandler = async () => {
    console.log("proofRequestHandler");
    if (requestSentRef.current) return; // Prevent duplicate calls in development mode
    requestSentRef.current = true;
    try {
      const proofResp = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/send-proof-request`,
        { proofRequestlabel: "IT Certificate", connectionId, version: "1.0" }
      );
      console.log(proofResp);
      await proofStatusCheck(proofResp.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const proofStatusCheck = async (proofRecordId) => {
    let timeoutId = null;

    const intervalId = setInterval(async () => {
      try {
        if (proofRecordId) {
          const proofData = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/proof-data/${proofRecordId}`
          );
          if (proofData.data.presentation) {
            console.log(
              "revealed attributes",
              proofData.data.presentation.anoncreds,
              proofData.data.presentation.anoncreds.requested_proof
                .revealed_attr_groups.name.values.department.raw
            );
            setDepartment(
              proofData.data.presentation.anoncreds.requested_proof
                .revealed_attr_groups.name.values.department.raw
            );
            console.log(
              "predicate data",
              proofData.data.presentation.anoncreds.proof.proofs[1]
                .primary_proof.ge_proofs[0].predicate
            );
            const predicate =
              proofData.data.presentation.anoncreds.proof.proofs[1]
                .primary_proof.ge_proofs[0].predicate;
            console.log("predicate", predicate);
            if (predicate.p_type === "GE") {
              console.log(`>= ${predicate.value.toString()}`);
              setPredicateValue(`>= ${predicate.value.toString()}`);
            } else if (predicate.p_type === "LE") {
              setPredicateValue(`<= ${predicate.value.toString()}`);
            } else {
              setPredicateValue(
                `${predicate.p_type} ${predicate.value.toString()}`
              );
            }
            clearInterval(intervalId);
            clearTimeout(timeoutId);
          }
        }
      } catch (error) {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      }
    }, 2000);

    timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, 300000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  };

  useEffect(() => {
    // proofRequestHandler();
  });
  return (
    <Card className="w-full max-w-[48rem] flex-row mx-auto mt-40">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none bg-gray-100 flex  items-center"
      >
        <Lottie
          animationData={acceptCred}
          loop={true}
          autoplay={true}
          className="w-80 h-80 mx-auto"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          You are connected with a verifer
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          Share Proof Of The Credential From Your Wallet
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          The verifier has sent you a proof request to your bifold wallet.
          Please share proof of the certificate.
        </Typography>
        <Card color="transparent" shadow={false}>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Department{" "}
                {department.length === 0 && (
                  <Image
                    src="/icons-loading.gif"
                    alt="loading"
                    width={20}
                    height={20}
                    className="inline-block "
                  />
                )}
              </Typography>
              <Input
                size="lg"
                placeholder="Shared credential attribute"
                value={department}
                disabled
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Age{" "}
                {predicateValue.length === 0 && (
                  <Image
                    src="/icons-loading.gif"
                    alt="loading"
                    width={20}
                    height={20}
                    className="inline-block "
                  />
                )}
              </Typography>
              <Input
                size="lg"
                value={predicateValue}
                disabled
                placeholder="Predicate value of age"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
            </div>
          </form>
        </Card>
      </CardBody>
      <Button
        onClick={() => setActiveStep(4)}
        variant="btn"
        className="flex items-center  text-white text-[12px] w-[120px] pl-2"
      >
        Next
        <img
          src="/right.svg"
          alt="Icon"
          width="20"
          height="20"
          className="ml-1"
        />
      </Button>
    </Card>
  );
};

export default ShareProof;
