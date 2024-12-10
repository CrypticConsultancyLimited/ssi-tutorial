import { Button } from "@material-tailwind/react";
import axios from "axios";
import React from "react";

const ApplyForPosition = ({ setActiveStep }) => {
  const clickHandler = async (idx) => {
    console.log(idx);
    try {
      const token = localStorage.getItem("token");
      const connectionId = localStorage.getItem("conId");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ISSUER_API}/agent/issue-credential`,
        {
          connectionId,
          course: certificates[idx].course,
          skill: certificates[idx].skill,
          percentage: certificates[idx].percentage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setActiveStep(2);
    } catch (error) {
      console.error("Error registering user:", (error).message);
    }
  };
  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-y-10 gap-x-8 py-12">
          <div className="col-start-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
            {certificates.length > 0 ? (
              certificates.map((certificate, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-300 rounded-xl"
                >
                  <div className=" text-lg sm:text-sm py-5 lg:py-0">
                    <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                      <img
                        src={certificate.imageSrc}
                        alt={certificate.imageSrc}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="px-2 text-center">
                      <div className="mt-6 block font-normal text-gray-900">
                        {certificate.course}
                      </div>
                      <div className="block font-normal text-red-600">
                        Minimum Requirement {certificate.percentage}%
                      </div>
                      <p
                        aria-hidden="true"
                        className="mt-2 mb-5 text-2xl font-semibold "
                      >
                        {certificate.skill}
                      </p>
                    </div>
                    <div className="flex justify-center rounded-md p-2">
                      <Button onClick={() => clickHandler(index)}>Apply</Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No data to show</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyForPosition;

// interface Certificate {
//   course: string;
//   imageSrc: string;
//   skill: string;
//   percentage: string;
//   category:
//     | "mobiledevelopment"
//     | "webdevelopment"
//     | "datascience"
//     | "cloudcomputing";
//   certificatesObtained: boolean;
// }

const certificates= [
  {
    course: "Node.js, Express.js",
    imageSrc: "/courses/coursesTwo.svg",
    skill: "Backend developer",
    percentage: "80",
    category: "webdevelopment",
    certificatesObtained: false,
  },
  {
    course: "React Native, Node.js",
    imageSrc: "/courses/coursesOne.svg",
    skill: "Mobile Developer",
    percentage: "80",
    category: "mobiledevelopment",
    certificatesObtained: false,
  },
  {
    course: "TensorFlow, SQL",
    imageSrc: "/courses/coursesFour.svg",
    skill: "Data Science",
    percentage: "80",
    category: "datascience",
    certificatesObtained: false,
  },
  {
    course: "SAAS, IAAS",
    imageSrc: "/courses/coursesThree.svg",
    skill: "Cloud computing",
    percentage: "80",
    category: "cloudcomputing",
    certificatesObtained: false,
  },
];
