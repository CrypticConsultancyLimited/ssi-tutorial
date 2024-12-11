"use client";
import React from "react";
import { Stepper, Step } from "@material-tailwind/react";
import EstablishConenction from "./EstablishConenction";
import {
  QrCodeIcon,
  ClipboardDocumentListIcon,
  ShareIcon,
  PencilSquareIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import Congrats from "./Congrats";
import ShareProof from "./ShareProof";
import Failure from "./Failure";
import ApplyForPosition from "./Apply";
import { GetStart } from "./GetStarted";
import AcceptCredential from "./AcceptCredential";
import ConnenctionWithVerifier from "./ConnectionWithVerifiaction";

export function VerifierStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [connectionId, setConnectionId] = React.useState("");

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  return (
    <div className="w-full px-32 py-16">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
        className="mb-32"
      >
        <Step onClick={() => setActiveStep(0)}>
          <QrCodeIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <p
              className={
                activeStep === 0 ? "text-blue-gray-900" : "text-gray-700"
              }
            >
              Step 1
            </p>
            <p
              className={
                activeStep === 0
                  ? "text-blue-gray-900 font-semibold"
                  : "text-gray-700 font-semibold"
              }
            >
              Connect with Veriifer
            </p>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <ShareIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <p
              className={
                activeStep === 1 ? "text-blue-gray-900" : "text-gray-700"
              }
            >
              Step 2
            </p>
            <p
              className={
                activeStep === 1
                  ? "text-blue-gray-900 font-semibold"
                  : "text-gray-700 font-semibold"
              }
            >
              Share Proof Presentation
            </p>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <ClipboardDocumentListIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <p
              className={
                activeStep === 2 ? "text-blue-gray-900" : "text-gray-700"
              }
            >
              Step 3
            </p>
            <p
              className={
                activeStep === 2
                  ? "text-blue-gray-900 font-semibold"
                  : "text-gray-700 font-semibold"
              }
            >
              Congratulations
            </p>
          </div>
        </Step>
      </Stepper>
     
      {activeStep === 0 ? (
        <EstablishConenction
          isVerifier={true}
          setActiveStep={setActiveStep}
          setConnectionId={setConnectionId}
        />
      ) : activeStep === 1 ? (
        <ShareProof isVerifier={true} setActiveStep={setActiveStep} connectionId={connectionId} />
      ) : activeStep === 2 ? (
        <Congrats />
      ) : (
        <Failure />
      )}
    </div>
  );
}
