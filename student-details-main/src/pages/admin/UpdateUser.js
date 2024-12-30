import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentByGrNumber, updateStudent } from "../../utils/getDataFromGr";

const UpdateUser = () => {
  const { grNumber } = useParams();
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getStudentByGrNumber(grNumber);
        if (data) {
          setUserData(data);
        }
      } catch (error) {
        setErrorMessage("Error fetching user data.");
      }
    };
    fetchUserData();
  }, [grNumber]);

  const initialValues = userData || {
    grNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    grade: "",
    class: "",
    adhaarCard: "",
    enrollmentCode: "",
    contactDetails: {
      motherEmail: "",
      motherMobile: "",
      fatherEmail: "",
      fatherMobile: "",
    },
    medical: {
      sex: "",
      bloodGroup: "",
      height: "",
      allergies: "",
      medicalConsent: false,
    },
    lunchPreferences: {
      lunchRequired: false,
      dietaryPreference: "Non-Jain",
    },
    permissions: {
      artRoom: false,
      compLab: false,
      eLibrary: false,
    },
    grp1: [],
    grp2MathsEconomics: "",
    grp2ScienceEcology: "",
    grp3: "",
    HLPProgram: {
      dayOfParticipation: "Monday",
      duration: "",
    },
    misc: {
      nationality: "",
      Religion: "",
      motherName: "",
      fatherName: "",
    },
    address: {
      flatNo: "",
      building: "",
      street: "",
      pincode: "",
    },
    hlp: "",
  };

  const handleSubmit = async (values) => {
    setErrorMessage(null);
    try {
      const response = await updateStudent(grNumber, values);
      if (response && response.error) {
        setErrorMessage("An error occurred while updating user data.");
        window.scrollTo(0, 0);
      } else {
        navigate("/admin/users");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      setErrorMessage("An error occurred. Please try again.");
      window.scrollTo(0, 0);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className="w-full max-w-2xl p-6 space-y-6 bg-white shadow-lg rounded-md">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
            Update User
          </h2>

          {/* Error Message Display */}
          {errorMessage && (
            <div className="bg-red-200 text-red-600 p-2 rounded-md text-center mb-4">
              {errorMessage}
            </div>
          )}

          {/* GR Number */}
          <div>
            <label className="block text-gray-600">GR Number</label>
            <Field
              type="text"
              name="grNumber"
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Personal Details */}
          <h3 className="text-xl font-semibold text-gray-700">
            Personal Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">First Name *</label>
              <Field
                type="text"
                name="firstName"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600">Middle Name</label>
              <Field
                type="text"
                name="middleName"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600">Last Name *</label>
              <Field
                type="text"
                name="lastName"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600">Grade *</label>
              <Field
                as="select"
                name="grade"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </Field>
            </div>
            <div>
              <label className="block text-gray-600">Class *</label>
              <Field
                as="select"
                name="class"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select Class</option>
                {[...Array(10).keys()].map((n) => (
                  <option key={n + 1} value={n + 1}>
                    {n + 1}
                  </option>
                ))}
              </Field>
            </div>
          </div>

          {/* Additional Details */}
          {/* Add other fields similarly */}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded mt-6 hover:bg-blue-700 transition-colors duration-300"
          >
            Submit
          </button>
        </Form>
      </Formik>

      <button
        onClick={() => navigate("/admin/users")}
        className="mt-6 bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition-colors duration-300"
      >
        Back to Users
      </button>
    </div>
  );
};

export default UpdateUser;
