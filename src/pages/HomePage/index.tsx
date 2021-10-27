import { useState, useEffect } from "react";
import { Account } from "../../entities/Account";
import { getMyAccount } from "../../apis/AccountApis";

function HomePage() {

	const [myAccount, setAccount] = useState<Account>();

	const accountId = JSON.parse(
		window.sessionStorage.getItem("loggedInAccountId") || "{}"
	);

	useEffect(() => {
		getMyAccount(accountId).then(receivedAccount => {
			setAccount(receivedAccount);
		  });
	}, []);

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
			<h1>This is home page.</h1>
		</div>
    )
}

export default HomePage