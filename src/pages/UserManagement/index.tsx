import React, {useState, useEffect} from 'react'
import { getMyAccount } from "../../apis/Account/AccountApis";
import { Account } from "../../apis/Entities/Account";

function UserManagement() {
    const [account, setAccount] = useState<Account>();

    const accountId = 4;
// just checking if backend is connected to frontend
    useEffect(() => {
     getMyAccount(accountId).then(receivedAccount => {
        setAccount(receivedAccount)
    });

    }, [])

    return (
    <div
        style={{
            display: "flex",
				justifyContent: "center",
				alignItems: "center",
                height: "auto",
                color: "#000000",
                background: "white",
        }}
    >
        <h1>Manage Users</h1>
    </div>
    );
}

export default UserManagement
