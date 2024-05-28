--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: t_announcement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.t_announcement (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    description character varying(200) NOT NULL,
    date character varying(100) NOT NULL
);


ALTER TABLE public.t_announcement OWNER TO postgres;

--
-- Name: t_announcement_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.t_announcement_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.t_announcement_id_seq OWNER TO postgres;

--
-- Name: t_announcement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.t_announcement_id_seq OWNED BY public.t_announcement.id;


--
-- Name: t_player; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.t_player (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    "position" character varying(100) NOT NULL,
    height integer NOT NULL,
    section character varying(100) NOT NULL
);


ALTER TABLE public.t_player OWNER TO postgres;

--
-- Name: t_player_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.t_player_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.t_player_id_seq OWNER TO postgres;

--
-- Name: t_player_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.t_player_id_seq OWNED BY public.t_player.id;


--
-- Name: t_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.t_user (
    id integer NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(10) NOT NULL
);


ALTER TABLE public.t_user OWNER TO postgres;

--
-- Name: t_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.t_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.t_user_id_seq OWNER TO postgres;

--
-- Name: t_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.t_user_id_seq OWNED BY public.t_user.id;


--
-- Name: t_announcement id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t_announcement ALTER COLUMN id SET DEFAULT nextval('public.t_announcement_id_seq'::regclass);


--
-- Name: t_player id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t_player ALTER COLUMN id SET DEFAULT nextval('public.t_player_id_seq'::regclass);


--
-- Name: t_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t_user ALTER COLUMN id SET DEFAULT nextval('public.t_user_id_seq'::regclass);


--
-- Data for Name: t_announcement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.t_announcement (id, title, description, date) FROM stdin;
29	First title	First description	17/05/2024
32	Another one	asdasdasd	23/05/2024
33	Some other	asdasdasd	23/05/2024
\.


--
-- Data for Name: t_player; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.t_player (id, name, "position", height, section) FROM stdin;
1	Robert	striker	173	men_football
2	Bobert	midfielder	170	men_football
3	Cornel	goalkeeper	190	men_football
4	Calin	defender	187	men_football
10	Canar	defender	190	men_football
11	Botista	midfielder	170	men_football
16	Gina	striker	178	female_football
\.


--
-- Data for Name: t_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.t_user (id, username, password) FROM stdin;
1	admin	admin2003
\.


--
-- Name: t_announcement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.t_announcement_id_seq', 33, true);


--
-- Name: t_player_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.t_player_id_seq', 16, true);


--
-- Name: t_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.t_user_id_seq', 1, true);


--
-- Name: t_announcement t_announcement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t_announcement
    ADD CONSTRAINT t_announcement_pkey PRIMARY KEY (id);


--
-- Name: t_player t_player_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t_player
    ADD CONSTRAINT t_player_pkey PRIMARY KEY (id);


--
-- Name: t_user t_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t_user
    ADD CONSTRAINT t_user_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

