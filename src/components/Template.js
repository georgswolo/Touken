import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";

function Template({ title, children, backBtn }) {
    return (
        <>
            <Header title={title} backBtn={backBtn}></Header>
            <main>
                {children}
            </main>
            <Footer></Footer>
        </>
    );
}

Template.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Template;