import React, { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { useLocation, NavLink } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState(null);

  const updateImage = async () => {
  if (!image) {
    toast.error("Please select an image first.");
    return;
  }
  try {
    const formData = new FormData();
    formData.append('image', image);

    // Corrected to use axios.post and a string URL
    const { data } = await axios.post('/api/owner/update-image', formData);

    if (data.success) {
      toast.success(data.message);
      await fetchUser(); // This will refresh the user data
      setImage(null); // Clear the selected image preview
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Image upload failed");
  }
};

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-border-color text-sm">
      <div className="group relative">
        <label htmlFor="image-upload" className="cursor-pointer">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"
            }
            alt="User Profile"
            className="h-12 w-12 md:h-16 md:w-16 rounded-full mx-auto object-cover"
          />
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="absolute hidden inset-0 bg-black/20 rounded-full group-hover:flex items-center justify-center">
            <img src={assets.edit_icon} alt="Edit" className="w-6 h-6" />
          </div>
        </label>
      </div>

      {image && (
        <button 
          onClick={updateImage} 
          className="absolute top-2 right-2 flex items-center p-2 gap-1 bg-primary/10 text-primary rounded-full text-xs font-semibold hover:bg-primary/20 transition-colors"
        >
          <span>Save</span>
          <img src={assets.check_icon} width={14} alt="Save" />
        </button>
      )}

      <p className="mt-2 text-base font-medium max-md:hidden">{user?.name}</p>

      <div className="w-full mt-6">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-3 w-full py-3 pl-4 ${
              location.pathname === link.path ? "bg-primary/10 text-primary font-semibold" : "text-gray-600"
            }`}
          >
            <img src={location.pathname === link.path ? link.coloredIcon : link.icon} alt={link.name} className="w-5 h-5" />
            <span className="max-md:hidden">{link.name}</span>
            <div
              className={`${location.pathname === link.path && "bg-primary"} w-1.5 h-full rounded-l-md right-0 absolute`}
            ></div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;