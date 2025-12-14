package com.learningportal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    /**
     * Forward all non-API routes to index.html for React Router to handle
     * This enables client-side routing for the SPA
     */
    @GetMapping(value = {
        "/",
        "/login",
        "/register",
        "/dashboard",
        "/{path:[^\\.]*}"  // Match any path without a file extension
    })
    public String forward() {
        return "forward:/index.html";
    }
}
