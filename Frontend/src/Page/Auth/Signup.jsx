import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/MainLoading";

const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const data = {
      fullname: event.target.fullname.value,
      domain: event.target.domain.value,
      email: event.target.email.value,
      place: event.target.place.value,
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value,
      description: event.target.description.value,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responsedata = await response.json();
      if (!response.status) {
        setIsLoading(false);
        setMessage(responsedata.message);

        throw new Error("Network response was not ok");
      }

      localStorage.setItem("token", responsedata.jwt);
      localStorage.setItem("fullname", responsedata.fullname);
      localStorage.setItem("domain", responsedata.domain);
      localStorage.setItem("place", responsedata.place);
      localStorage.setItem("description", responsedata.description);
      if (responsedata.jwt != null) {
        setMessage("Register Successfully");

        navigate("/home");
      } else {
        setIsLoading(false);

        setMessage(responsedata.message);
      }
    } catch (error) {
      setIsLoading(false);

      setMessage(responsedata.message);
      throw new Error(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="  min-h-screen " style={{ backgroundColor: "#EEF2FF" }}>
        <div className=" py-28">
          <div className="max-w-4xl mx-auto shadow-lg flex flex-col md:flex-row">
            <div
              className="hidden md:block w-1/2 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dgmsfmeaz/image/upload/v1730360938/KnowledgeTest/zxyeddspyhi9pxxkh3ws.jpg')",
              }}
            ></div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full md:w-1/2 bg-white p-10"
            >
              <h2 className="text-center text-2xl mb-8">
                <strong>Create</strong> account
              </h2>
              <div className="mb-4">
                <input
                  className="form-control w-full bg-[#f7f9fc] border-b border-[#dfe7f1] h-10 px-2 placeholder:text-gray-600"
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  className="form-control w-full bg-[#f7f9fc] border-b border-[#dfe7f1] h-10 px-2 placeholder:text-gray-600"
                  type="text"
                  name="domain"
                  placeholder="Profession"
                  required
                />
              </div>
              <div className="mb-4 ">
                <input
                  className="form-control w-full bg-[#f7f9fc] border-b border-[#dfe7f1] h-10 px-2 placeholder:text-gray-600 "
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  className="form-control w-full bg-[#f7f9fc] border-b border-[#dfe7f1] h-10 px-2 placeholder:text-gray-600"
                  type="text"
                  name="place"
                  placeholder="Location"
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  className="form-control w-full bg-[#f7f9fc] border-b border-[#dfe7f1] h-10 px-2 placeholder:text-gray-600"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  className="form-control w-full bg-[#f7f9fc] border-b border-[#dfe7f1] h-10 px-2 placeholder:text-gray-600"
                  type="text"
                  name="confirmPassword"
                  placeholder="Confirm-Password"
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  className="form-control w-full bg-[#f7f9fc] border-b border-[#dfe7f1] h-10 px-2 placeholder:text-gray-600"
                  type="text"
                  name="description"
                  placeholder="Describe your self."
                />
              </div>

              <div className="mb-4">
                <label className=" pl-1 flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <span className="ml-2 text-black  text-sm">
                    I accept the{" "}
                    <a href="#" className="text-black">
                      Terms and Conditions
                    </a>
                  </span>
                </label>
              </div>

              <div className="text-red-500">{message}</div>
              <div className="mb-4">
                <Button
                  className="btn btn-primary w-full text-white py-2 rounded  transition-transform active:translate-y-1"
                  type="submit"
                >
                  Signup
                </Button>
              </div>

              <a href="/login" className="text-center text-sm text-blue-700 ">
                Already have an account?
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
