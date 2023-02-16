import RecipeProducts from "../RecipeProducts/RecipeProducts";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as commentService from '../../../../services/commentService'
import RecipeComments from "../RecipeComments/RecipeComments";

export default function RecipePanel({ recipe }) {
    const location = useLocation();
    const currentSection = location.pathname.split('/')[3] == undefined ? '/' : location.pathname.split('/')[3];

    return (
        <>
            {
                currentSection == '/'
                    ? <RecipeProducts {...recipe} />
                    : <RecipeComments />
            }
        </>
    );
}