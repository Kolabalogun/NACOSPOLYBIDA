import React from "react";

import { Route, Routes, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import NotFound from "../Pages/NotFound";
import Blog from "../Pages/Blog";
import EditBlog from "../Backend/EditBlog";

import Auth from "../Auth/Auth";
import Details from "../Blog/Details";
import { useState } from "react";
import Contact from "../Pages/Contact";
import { Admin } from "../Backend/Admin";
import Dashboard from "../Backend/Pages/Dashboard";


const Pages = ({ user, handleLogout, loader }) => {
  const [pageType, pageTypeF] = useState(null);
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>

        <Route
          path="/"
          element={<Blog user={user} loader={loader} />}
        />

        {user && (
          <>
            <Route
              path="/addBulletin"
              element={
                <EditBlog
                  user={user}
                  handleLogout={handleLogout}
                  pageType={pageType}
                  pageTypeF={pageTypeF}
                />
              }
            />
            <Route
              path="/updateBulletin/:id"
              element={
                <EditBlog
                  user={user}
                  handleLogout={handleLogout}
                  pageType={pageType}
                  pageTypeF={pageTypeF}
                />
              }
            />



          </>
        )}

        <Route
          path="/auth"
          element={
            <Auth
              user={user}
              handleLogout={handleLogout}
              pageType={pageType}
              pageTypeF={pageTypeF}
            />
          }
        />

        <Route path="/detail/:id" element={<Details />} />
        <Route path="/contact" element={<Contact />} />


        <Route path="*" element={<NotFound />} />


        {/* Admin Pages  */}
        <Route path="/admin" element={<Admin />} />

        {user && (
          <>
            <Route
              path="/admin/updatestaff/:id"
              element={
                <Admin

                />
              }
            />
            <Route
              path="/admin/updatestudent/:id"
              element={
                <Admin

                />
              }
            />
            <Route
              path="/admin/updatecourse/:id"
              element={
                <Admin

                />
              }
            />


          </>
        )}

      </Routes>
    </AnimatePresence>
  );
};

export default Pages;
