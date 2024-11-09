import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import { CircularProgress } from "@nextui-org/react";
import { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";

const ClaimList = () => {
  const { getAllClaims } = useActions();
  const { claims, isLoading } = useAppSelector((state) => state.claim);

  useEffect(() => {
    getAllClaims();
  }, [getAllClaims]);

  if (isLoading) return <CircularProgress />;
  return (
    <div>
      {claims.map((claim) => (
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">{claim.claimType}</p>
              <p className="text-small text-default-500">{claim.email}</p>
              <p className="text-small text-default-500">{claim.phone || ""}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>{claim.text}</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <span>{new Date(claim.createdAt).toLocaleString()}</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ClaimList;
