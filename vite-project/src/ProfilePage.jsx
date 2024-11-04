import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "./axiosConfig";

const ProfilePage = () => {
  const { employeeId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(`/auth/profile/${employeeId}`);
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [employeeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  ">
      <div className="bg-blue-100 p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-4xl font-bold mb-6 text-center w-full">
          My Profile
        </h2>
        {profile && (
          <div className="items-center justify-center">
            <p className="text-xl">
              <strong>Name: </strong> {profile.firstName} {profile.lastName}
            </p>
            {/* <p className="text-xl"><strong></strong></p> */}
            <p className="text-xl">
              <strong>Email:</strong> {profile.email}
            </p>
            <p className="text-xl">
              <strong>Phone Number:</strong> {profile.phoneNumber}
            </p>
            <p className="text-xl">
              <strong>Employee ID:</strong> {profile.employeeId}
            </p>
            <p className="text-xl">
              <strong>Date of Birth:</strong>{" "}
              {new Date(profile.dateOfBirth).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
