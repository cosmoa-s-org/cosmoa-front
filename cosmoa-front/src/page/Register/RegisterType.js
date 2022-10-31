import React from "react";
import { Paper, Link } from "@material-ui/core";

function RegisterType() {
    return(<>
        Select Register Course / Place

        <Link href="/registercourse">
            <Paper>
                코스 등록
            </Paper>
        </Link>

        <Link href="/registerplace">
            <Paper>
                장소 등록
            </Paper>
        </Link>

    </>)
}

export default RegisterType;
