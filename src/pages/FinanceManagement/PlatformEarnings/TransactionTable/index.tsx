import React, { useState, useEffect } from 'react'
import { TransactionWithParticularsResp } from "../../../../apis/Entities/Transaction";
import { 
    WidgetLg, 
    WidgetLgAmount, 
    WidgetLgDate, 
    WidgetLgImg, 
    WidgetLgName, 
    WidgetLgTable, 
    WidgetLgTh, 
    WidgetLgTitle, 
    WidgetLgTr, 
    WidgetLgUser 
} from "../../WidgetLg"

function TransactionTable(props: any) {
    const [transactions, setTransactions] = useState<TransactionWithParticularsResp[]>([...props.transactions]);

    useEffect(() => {
        setTransactions(props.transactions);
    }, [props.transactions]);

    console.log(transactions)

    return (
        <WidgetLg>
            <WidgetLgTitle>Latest Transactions</WidgetLgTitle>
            <WidgetLgTable>
                <WidgetLgTr>
                    <WidgetLgTh>Customer</WidgetLgTh>
                    <WidgetLgTh>DateTime Of Transaction</WidgetLgTh>
                    <WidgetLgTh>Profit</WidgetLgTh>
                    <WidgetLgTh>Course Name</WidgetLgTh>
                    <WidgetLgTh>Tutor Name</WidgetLgTh>
                </WidgetLgTr>  
                {transactions && transactions?.map(t => {
                    return (
                    <WidgetLgTr>                   
                        <WidgetLgUser>
                            <WidgetLgImg src={t.displayPictureUrl}></WidgetLgImg>
                            <WidgetLgName>{t.customerName}</WidgetLgName>                        
                        </WidgetLgUser>
                        <WidgetLgDate>{t.dateTimeOfTransaction}</WidgetLgDate>
                        <WidgetLgAmount>{t.platformFee}</WidgetLgAmount>
                        <WidgetLgAmount>{t.courseName}</WidgetLgAmount>
                        <WidgetLgAmount>{t.tutorName}</WidgetLgAmount>
                    </WidgetLgTr> 
                    );
                })
                
                }            
            </WidgetLgTable>
        </WidgetLg>
    )
}

export default TransactionTable
