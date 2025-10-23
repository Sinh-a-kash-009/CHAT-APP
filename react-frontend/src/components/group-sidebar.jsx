import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Val from "./sidebarval";


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState("280px")
    const [size, setSize] = useState("full")
    const [icon, setIcon] = useState("150px")
    const [ul, setUl] = useState( <Val/>)
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg sidebar" style={{
            width: isOpen, height: "90.8vh", background: "#3f3c3c",
            borderRadius: "15px"
        }}>
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                </svg>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: icon }}>
                    <span className="fs-4" >chats
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {
                        if (size === "full") {
                            setSize("small")
                            setIsOpen("50px")
                            setIcon("0px")
                            setUl(<></>)
                            document.querySelector(".sidebar").childNodes[0].children[1].children[0].innerHTML = ''
                            // const sidebar = document.querySelector(".sidebar");
                            // const ul = sidebar.querySelector("ul"); // or use querySelectorAll if multiple
                            // if (ul) ul.remove();
                        } else {

                            setSize("full")
                            setIsOpen("280px")
                            setIcon("150px")
                            setUl(<Val/>)
                            document.querySelector(".sidebar").childNodes[0].children[1].children[0].innerHTML = 'chats'
                        }
                    }} width="32" height="32" fill="white" className="bi bi-arrows-collapse-vertical" viewBox="0 0 16 16">
                        <path d="M8 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M0 8a.5.5 0 0 1 .5-.5h3.793L3.146 6.354a.5.5 0 1 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8.5H.5A.5.5 0 0 1 0 8m11.707.5 1.147 1.146a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2a.5.5 0 0 1 .708.708L11.707 7.5H15.5a.5.5 0 0 1 0 1z" />
                    </svg>
                </span>
            </div>
            <hr />
            {ul}
        </div>
    );
};

export default Sidebar;
