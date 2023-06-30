import React, {useState} from "react";


const SignUpForm = () => {
        const [formData, setFormData] = useState({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        });

        const [errors, setErrors] = useState({});

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        };

        const handleSubmit = async (event) => {
            event.preventDefault();

            const validationErrors = {};
            if (formData.username.trim() === "") {
                validationErrors.username = "Username is required";
            }
            if (formData.email.trim() === "") {
                validationErrors.email = "Email is required";
            }
            if (formData.password.trim() === "") {
                validationErrors.password = "Password is required";
            }
            if (formData.confirmPassword.trim() === "") {
                validationErrors.confirmPassword = "Confirmation password is required";
            }


            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
            } else {
                console.log("Form submitted successfully");
            }

            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
        };

        return (

            <div>
                <h1>Signup</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <br/>
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <br/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="text"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <br/>
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input
                            type="text"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <br/>
                    </div>

                    <button type="submit">Signup</button>
                </form>
            </div>
        );

    }
;
export default SignUpForm;