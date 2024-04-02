export const TransactionService = {
    getTransactionsData() {
        return [
            {
                id:1,
                transId:'DHBHBK7',
                amount:20,
                charge:0.00,
                remarks:"Package Payment via Stripe",
                date:'29-03-2024'
            },
            {
                id:2,
                transId:'KHBU68B',
                amount:50,
                charge:1.00,
                remarks:"Package Payment via Paypal",
                date:'29-03-2023'
            },
            {
                id:3,
                transId:'JHJHJHJ',
                amount:100,
                charge:2.00,
                remarks:"Package Payment via Stripe",
                date:'29-03-2022'
            },
            {
                id:4,
                transId:'JHJHJHJ',
                amount:100,
                charge:2.00,
                remarks:"Package Payment via Stripe",
                date:'29-03-2022'
            },
            {
                id:5,
                transId:'JHJHJHJ',
                amount:100,
                charge:2.00,
                remarks:"Package Payment via Stripe",
                date:'29-03-2022'
            },
            {
                id:6,
                transId:'JHJHJHJ',
                amount:100,
                charge:2.00,
                remarks:"Package Payment via Stripe",
                date:'29-03-2022'
            },
            {
                id:7,
                transId:'JHJHJHJ',
                amount:100,
                charge:2.00,
                remarks:"Package Payment via Stripe",
                date:'29-03-2022'
            },
            {
                id:8,
                transId:'JHJHJHJ',
                amount:100,
                charge:2.00,
                remarks:"Package Payment via Stripe",
                date:'29-03-2022'
            },
            {
                id:9,
                transId:'JHJHJHJ',
                amount:100,
                charge:2.00,
                remarks:"Package Payment via Stripe",
                date:'29-03-2022'
            },
            {
                id:10,
                transId:'JHJHJHJ',
                amount:100,
                charge:2.00,
                remarks:"Package Payment via Stripe",
                date:'29-03-2022'
            },
            {
                id:11,
                transId:'JHJHJHJ',
                amount:100,
                charge:2.00,
                remarks:"Package Payment via Stripe",
                date:'29-03-2022'
            },
        ];
    },
    getPaymentsData(){
        return [
            {
                id:1,
                transId:'DHBHBK7',
                method:'Stripe',
                amount:20,
                status:'Success',
            },
            {
                id:2,
                transId:'KHBU68B',
                method:'Paypal',
                amount:50,
                status:'Success',
            },
            {
                id:3,
                transId:'JHJHJHJ',
                method:'Stripe',
                amount:100,
                status:'Success',
            },
            {
                id:4,
                transId:'JHJHJHJ',
                method:'Stripe',
                amount:100,
                status:'Success',
            },
            {
                id:5,
                transId:'JHJHJHJ',
                method:'Stripe',
                amount:100,
                status:'Success',
            },
            {
                id:6,
                transId:'JHJHJHJ',
                method:'Stripe',
                amount:100,
                status:'Success',
            },
            {
                id:7,
                transId:'JHJHJHJ',
                method:'Stripe',
                amount:100,
                status:'Success',
            },
            {
                id:8,
                transId:'JHJHJHJ',
                method:'Stripe',
                amount:100,
                status:'Success',
            },
            {
                id:9,
                transId:'JHJHJHJ',
                method:'Stripe',
                amount:100,
                status:'Success',
            },
            {
                id:10,
                transId:'JHJHJHJ',
                method:'Stripe',
                amount:100,
                status:'Success',
            },
            {
                id:11,
                transId:'JHJHJHJ',
                method:'Stripe',
                amount:100,
                status:'Success',
            },

        ];
    },
    getTemplatesData(){
        return [
            {
                id:1,
                name:'Template 1',
                type:'Free',
                downloads:20,
            },
            {
                id:2,
                name:'Template 2',
                type:'Free',
                downloads:50,
            },
            {
                id:3,
                name:'Template 3',
                type:'Free',
                downloads:100,
            },
            {
                id:4,
                name:'Template 4',
                type:'Free',
                downloads:100,
            },
            {
                id:5,
                name:'Template 5',
                type:'Free',
                downloads:100,
            },
            {
                id:6,
                name:'Template 6',
                type:'Free',
                downloads:100,
            },
            {
                id:7,
                name:'Template 7',
                type:'Free',
                downloads:100,
            },
            {
                id:8,
                name:'Template 8',
                type:'Free',
                downloads:100,
            },
            {
                id:9,
                name:'Template 9',
                type:'Free',
                downloads:100,
            },
            {
                id:10,
                name:'Template 10',
                type:'Free',
                downloads:100,
            },
            {
                id:11,
                name:'Template 11',
                type:'Free',
                downloads:100,
            },

        ];
    },

    getTransactions() {
        return Promise.resolve(this.getTransactionsData());
    },
    getTransactionMini() {
        return Promise.resolve(this.getTransactionsData().slice(0, 5));
    },
    getPayments() {
        return Promise.resolve(this.getPaymentsData());
    },
    getPaymentMini() {
        return Promise.resolve(this.getPaymentsData().slice(0, 5));
    },
    getTemplates() {
        return Promise.resolve(this.getTemplatesData());
    },
}
