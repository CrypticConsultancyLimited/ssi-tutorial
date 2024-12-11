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
export function GetStart({ setActiveStep }) {
  return (
    <Card className="w-full max-w-[60rem] flex-row mx-auto mt-48">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none bg-gray-100"
      >
        <Lottie
          animationData={getStarted}
          loop={true}
          autoplay={true}
          className="w-full h-80 mx-auto"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          Let's get you started
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          Download the Bifold Wallet
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          This wallet will contain your digital credentials such as
          certificates. You will be able to verify your credential through this
          wallet.
        </Typography>
        <a href="#" className="inline-block">
          <Button
            variant="btn"
            className="flex items-center gap-2 text-white text-[12px]"
          >
            Download
            <img
              src="/download.svg"
              alt="Icon"
              width="20"
              height="20"
              className="text-white"
            />
          </Button>
        </a>
      </CardBody>
      <CardFooter className="flex ">
        <Button
          onClick={() => setActiveStep(1)}
          variant="btn"
          className="flex items-center  text-white text-[12px] pl-2"
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
      </CardFooter>
    </Card>
  );
}
