--
-- PostgreSQL database cluster dump
--

-- Started on 2025-04-13 17:13:03

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-04-13 17:13:03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2025-04-13 17:13:04

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-04-13 17:13:04

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 16387)
-- Name: pgagent; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA pgagent;


ALTER SCHEMA pgagent OWNER TO postgres;

--
-- TOC entry 5028 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA pgagent; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA pgagent IS 'pgAgent system tables';


--
-- TOC entry 11 (class 2615 OID 25712)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 5029 (class 0 OID 0)
-- Dependencies: 11
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- TOC entry 2 (class 3079 OID 16388)
-- Name: pgagent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgagent WITH SCHEMA pgagent;


--
-- TOC entry 5031 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgagent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgagent IS 'A PostgreSQL job scheduler';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 245 (class 1259 OID 25764)
-- Name: Account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    access_token text,
    expires_at integer,
    refresh_token text,
    token_type text,
    scope text,
    id_token text,
    session_state text
);


ALTER TABLE public."Account" OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 25735)
-- Name: Insurance_Policy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Insurance_Policy" (
    id text NOT NULL,
    name text NOT NULL,
    base_price_sgd numeric(10,2) DEFAULT 0.00 NOT NULL,
    type_of_policy_id integer NOT NULL
);


ALTER TABLE public."Insurance_Policy" OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 25743)
-- Name: Policy_Holder; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Policy_Holder" (
    id text NOT NULL,
    email text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL
);


ALTER TABLE public."Policy_Holder" OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 25750)
-- Name: Policy_Subscription; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Policy_Subscription" (
    policy_holder_id text NOT NULL,
    insurance_policy_id text NOT NULL,
    "purchasedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Policy_Subscription" OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 25727)
-- Name: policy_Type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."policy_Type" (
    id integer NOT NULL,
    type_of_policy text NOT NULL
);


ALTER TABLE public."policy_Type" OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 25726)
-- Name: Policy_Type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Policy_Type_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Policy_Type_id_seq" OWNER TO postgres;

--
-- TOC entry 5032 (class 0 OID 0)
-- Dependencies: 239
-- Name: Policy_Type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Policy_Type_id_seq" OWNED BY public."policy_Type".id;


--
-- TOC entry 246 (class 1259 OID 25771)
-- Name: Session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Session" OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 25757)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text NOT NULL,
    "emailVerified" timestamp(3) without time zone,
    password text,
    image text
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 25713)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 4806 (class 2604 OID 25730)
-- Name: policy_Type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."policy_Type" ALTER COLUMN id SET DEFAULT nextval('public."Policy_Type_id_seq"'::regclass);


--
-- TOC entry 4766 (class 0 OID 16389)
-- Dependencies: 223
-- Data for Name: pga_jobagent; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_jobagent (jagpid, jaglogintime, jagstation) FROM stdin;
7908	2025-04-13 16:14:59.85836+08	Chris-Ho-Computer-System
\.


--
-- TOC entry 4767 (class 0 OID 16398)
-- Dependencies: 225
-- Data for Name: pga_jobclass; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_jobclass (jclid, jclname) FROM stdin;
\.


--
-- TOC entry 4768 (class 0 OID 16408)
-- Dependencies: 227
-- Data for Name: pga_job; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_job (jobid, jobjclid, jobname, jobdesc, jobhostagent, jobenabled, jobcreated, jobchanged, jobagentid, jobnextrun, joblastrun) FROM stdin;
\.


--
-- TOC entry 4770 (class 0 OID 16456)
-- Dependencies: 231
-- Data for Name: pga_schedule; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_schedule (jscid, jscjobid, jscname, jscdesc, jscenabled, jscstart, jscend, jscminutes, jschours, jscweekdays, jscmonthdays, jscmonths) FROM stdin;
\.


--
-- TOC entry 4771 (class 0 OID 16484)
-- Dependencies: 233
-- Data for Name: pga_exception; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_exception (jexid, jexscid, jexdate, jextime) FROM stdin;
\.


--
-- TOC entry 4772 (class 0 OID 16498)
-- Dependencies: 235
-- Data for Name: pga_joblog; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_joblog (jlgid, jlgjobid, jlgstatus, jlgstart, jlgduration) FROM stdin;
\.


--
-- TOC entry 4769 (class 0 OID 16432)
-- Dependencies: 229
-- Data for Name: pga_jobstep; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_jobstep (jstid, jstjobid, jstname, jstdesc, jstenabled, jstkind, jstcode, jstconnstr, jstdbname, jstonerror, jscnextrun) FROM stdin;
\.


--
-- TOC entry 4773 (class 0 OID 16514)
-- Dependencies: 237
-- Data for Name: pga_jobsteplog; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_jobsteplog (jslid, jsljlgid, jsljstid, jslstatus, jslresult, jslstart, jslduration, jsloutput) FROM stdin;
\.


--
-- TOC entry 5021 (class 0 OID 25764)
-- Dependencies: 245
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Account" (id, "userId", type, provider, "providerAccountId", access_token, expires_at, refresh_token, token_type, scope, id_token, session_state) FROM stdin;
\.


--
-- TOC entry 5017 (class 0 OID 25735)
-- Dependencies: 241
-- Data for Name: Insurance_Policy; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Insurance_Policy" (id, name, base_price_sgd, type_of_policy_id) FROM stdin;
IP001	Basic Health Coverage	500.00	1
IP002	Travel Insurance	300.00	2
IP003	Comprehensive Life Plan	1200.00	3
IP004	Critical Illness Cover	700.00	4
IP005	Car Insurance	800.00	5
IP006	Home Insurance	600.00	6
IP007	Family Health Package	1500.00	1
IP008	Personal Accident Cover	350.00	7
IP009	Overseas Medical Insurance	400.00	2
IP010	Business Insurance Package	2000.00	8
IP011	Chris Insurance Package	50.00	4
IP012	Fire Policy	100.00	7
IP013	Act Of God Policy	100.00	2
IP014	Water Policy	100.00	7
IP015	Cycling Accident	400.00	7
IP016	Car Accident	400.00	7
IP017	Bus Accident Insurance	100.00	2
IP018	Wind Accident	100.00	7
IP019	Lost Luggage	50.00	2
IP020	Plane Accident	1000.00	7
IP022	Fall Accident	50.00	7
IP023	Business Failure Insurance	5000.00	8
IP024	Laptop Failure	500.00	8
IP025	Wallet Lost	50.00	8
PH009	Mary Ho	500.00	2
IP026	Dunno Insurance	90.00	2
PH030	Home Fire Insurance	1000.00	6
IP031	MJ Lost Insurance	90.00	8
IP034	Computer Data Loss Policy	1000.00	6
\.


--
-- TOC entry 5018 (class 0 OID 25743)
-- Dependencies: 242
-- Data for Name: Policy_Holder; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Policy_Holder" (id, email, "firstName", "lastName") FROM stdin;
PH001	john.doe@example.com	John	Doe
PH002	jane.smith@example.com	Jane	Smith
PH003	mike.lee@example.com	Mike	Lee
PH004	alice.wong@example.com	Alice	Wong
PH005	emily.chan@example.com	Emily	Chan
PH006	robert.oh@example.com	Robert	Oh
PH007	lily.tan@example.com	Lily	Tan
PH008	simon.koh@example.com	Simon	Koh
S12345678D	tom.cruise@topgun.com	Tom	Cruise
S9999999G	clinton@hotmail.com	clinton	HO
S1234567890D	hhhh@yahmoo.com	Ah	Seng
S888888M	ahTey@yahoo.com	Ah 	Tey
\.


--
-- TOC entry 5019 (class 0 OID 25750)
-- Dependencies: 243
-- Data for Name: Policy_Subscription; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Policy_Subscription" (policy_holder_id, insurance_policy_id, "purchasedAt") FROM stdin;
PH001	IP001	2025-04-13 03:19:53.843
PH001	IP002	2025-04-13 03:19:53.843
PH002	IP003	2025-03-13 15:19:53.843
PH002	IP004	2025-05-13 03:19:53.843
PH003	IP005	2025-02-12 03:19:53.843
PH004	IP006	2025-02-13 03:19:53.843
PH005	IP007	2025-06-13 03:19:53.843
PH005	IP002	2025-06-10 03:19:53.843
PH006	IP008	2025-07-13 03:19:53.843
PH006	IP002	2025-07-13 03:19:53.843
PH007	IP009	2025-08-13 03:19:53.843
PH008	IP010	2025-08-13 03:19:53.843
S888888M	IP015	2025-08-13 03:19:53.843
S9999999G	IP013	2025-08-13 03:19:53.843
S9999999G	IP020	2025-02-13 03:19:53.843
S9999999G	IP015	2025-02-13 03:19:53.843
S12345678D	IP003	2025-01-13 03:19:53.843
S1234567890D	IP010	2025-01-13 03:19:53.843
PH003	IP014	2025-07-13 03:19:53.843
PH004	IP007	2025-09-13 03:19:53.843
\.


--
-- TOC entry 5022 (class 0 OID 25771)
-- Dependencies: 246
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Session" (id, "sessionToken", "userId", expires) FROM stdin;
\.


--
-- TOC entry 5020 (class 0 OID 25757)
-- Dependencies: 244
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, "emailVerified", password, image) FROM stdin;
b9791746-e315-4863-9672-af3851c28d7c	\N	chris.hogk1@gmail.com	\N	$2b$10$0StjkL5ntEcfcK6yhIGBGep6EqV1tgxRdlG0t2Hk/oDIBsaiu6/yu	\N
d84618f9-50ce-410e-a504-0f0e408cd272	\N	ahkiat4u@gmail.com	\N	$2b$10$RThoBAs9hF1/qW3NN/ci0uPKtilvn7lhK2abqWM2F/F2mONDVMPd6	\N
\.


--
-- TOC entry 5014 (class 0 OID 25713)
-- Dependencies: 238
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
01704eae-15b6-4dd6-81e9-52d93b0816a0	2d1292b24a6e8a998242be2f6a544b4fedc173f76ec41e46e218cf26b15f8ffa	2025-04-03 20:55:18.586795+08	20250403125518_init	\N	\N	2025-04-03 20:55:18.40968+08	1
\.


--
-- TOC entry 5016 (class 0 OID 25727)
-- Dependencies: 240
-- Data for Name: policy_Type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."policy_Type" (id, type_of_policy) FROM stdin;
1	Health Insurance
2	Travel Insurance
3	Life Insurance
4	Critical Illness
5	Car Insurance
6	Home Insurance
7	Personal Accident
8	Business Insurance
\.


--
-- TOC entry 5033 (class 0 OID 0)
-- Dependencies: 239
-- Name: Policy_Type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Policy_Type_id_seq"', 8, true);


--
-- TOC entry 4859 (class 2606 OID 25770)
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- TOC entry 4849 (class 2606 OID 25742)
-- Name: Insurance_Policy Insurance_Policy_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Insurance_Policy"
    ADD CONSTRAINT "Insurance_Policy_pkey" PRIMARY KEY (id);


--
-- TOC entry 4852 (class 2606 OID 25749)
-- Name: Policy_Holder Policy_Holder_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Policy_Holder"
    ADD CONSTRAINT "Policy_Holder_pkey" PRIMARY KEY (id);


--
-- TOC entry 4854 (class 2606 OID 25756)
-- Name: Policy_Subscription Policy_Subscription_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Policy_Subscription"
    ADD CONSTRAINT "Policy_Subscription_pkey" PRIMARY KEY (policy_holder_id, insurance_policy_id);


--
-- TOC entry 4846 (class 2606 OID 25734)
-- Name: policy_Type Policy_Type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."policy_Type"
    ADD CONSTRAINT "Policy_Type_pkey" PRIMARY KEY (id);


--
-- TOC entry 4862 (class 2606 OID 25777)
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- TOC entry 4857 (class 2606 OID 25763)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 4844 (class 2606 OID 25721)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4860 (class 1259 OID 25781)
-- Name: Account_providerAccountId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Account_providerAccountId_key" ON public."Account" USING btree ("providerAccountId");


--
-- TOC entry 4850 (class 1259 OID 25779)
-- Name: Policy_Holder_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Policy_Holder_email_key" ON public."Policy_Holder" USING btree (email);


--
-- TOC entry 4847 (class 1259 OID 25778)
-- Name: Policy_Type_type_of_policy_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Policy_Type_type_of_policy_key" ON public."policy_Type" USING btree (type_of_policy);


--
-- TOC entry 4863 (class 1259 OID 25782)
-- Name: Session_sessionToken_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");


--
-- TOC entry 4855 (class 1259 OID 25780)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 4867 (class 2606 OID 25798)
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4864 (class 2606 OID 25783)
-- Name: Insurance_Policy Insurance_Policy_type_of_policy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Insurance_Policy"
    ADD CONSTRAINT "Insurance_Policy_type_of_policy_id_fkey" FOREIGN KEY (type_of_policy_id) REFERENCES public."policy_Type"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4865 (class 2606 OID 25793)
-- Name: Policy_Subscription Policy_Subscription_insurance_policy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Policy_Subscription"
    ADD CONSTRAINT "Policy_Subscription_insurance_policy_id_fkey" FOREIGN KEY (insurance_policy_id) REFERENCES public."Insurance_Policy"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4866 (class 2606 OID 25788)
-- Name: Policy_Subscription Policy_Subscription_policy_holder_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Policy_Subscription"
    ADD CONSTRAINT "Policy_Subscription_policy_holder_id_fkey" FOREIGN KEY (policy_holder_id) REFERENCES public."Policy_Holder"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4868 (class 2606 OID 25803)
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5030 (class 0 OID 0)
-- Dependencies: 11
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-04-13 17:13:04

--
-- PostgreSQL database dump complete
--

-- Completed on 2025-04-13 17:13:05

--
-- PostgreSQL database cluster dump complete
--

