import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Products from "./Products";
import "./Home.css";
import bannerImg from "../images/banner img.jpg";
// firebase items
import { auth, db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

function Home() {
  // showing user info.
  function GetCurrentUser() {
    const [user, setUser] = useState("");
    const userCollectionRef = collection(db, "users");

    // checking if user is logged or not
    useEffect(() => {
      auth.onAuthStateChanged((userLogged) => {
        if (userLogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userLogged.uid)
            );
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const loggedUser = GetCurrentUser();
  // just for testing
  if (loggedUser) {
    // .email or if we want to fetch name then .name//
    console.log(loggedUser[0].email);
  }

  // making home__slide functional
  useEffect(() => Slider(0), []);

  return (
    // div here is used to bind these components
    <div>
      <Navbar />
      <div className="home__container">
        {/* <img className="home__image" src={banner}></img> */}
        <div className="home__sliderContainer">
          <div className="home__slide">
            <div className="slide__content">
              <h1>Kamal Medicos Pharma Ltd.</h1>
              <p>
                A company whose foundations lie in the wholesale of medicines,
                pharmaceutical products and medical devices. Our team has a vast
                wealth of knowledge and expertise, and we pride ourselves on
                providing high-quality products and excellent customer service
                to our partners.
              </p>
            </div>
            <img
              className="home__img"
              src="http://incuitypharma.com/wp-content/uploads/2022/05/Pharma-Distributors-in-Chennai-1.jpg"
            ></img>
          </div>
          <div className="home__slide">
            <img
              className="home__img"
              src="https://www.numeralifesciences.com/storage/blogs/vwxa46f0nn.jpg"
            ></img>
          </div>
          <div className="home__slide">
            <img className="home__img" src={bannerImg}></img>
          </div>
        </div>
      </div>
      <Products />
    </div>
  );
}

// making home__slide functional
function Slider(counter) {
  const slides = document.querySelectorAll(".home__img");
  slides.forEach((slide, index) => {
    if (index !== counter) {
      slide.style.visibility = "hidden";
      slide.classList.add(`image-${index}`);
    }
  });
  moveCarousal(counter, slides, slides.length);
}

// defining function moveCarousal(from above)
function moveCarousal(counter, slides, len) {
  if (slides) {
    if (counter >= len - 1) counter = 0;
    else counter += 1;

    slides.forEach((slide, index) => {
      if (index === counter) {
        slide.style.visibility = `visible`;
      } else {
        slide.style.visibility = `hidden`;
      }
    });
  }
  setTimeout(() => {
    moveCarousal(counter, slides, len);
  }, 5000);
}

export default Home;
