CREATE TABLE public.agro_advisory (
    id serial,
    location_id integer,
    adv_date date,
    adv_weather character varying(1000) ,
    adv_rice character varying(1000) ,
    adv_fodder character varying(1000) ,
    adv_sugarcane character varying(1000) ,
    adv_vegetables character varying(1000) ,
    advi_cattle character varying(1000),
    adv_gen character varying(1000) 
);
CREATE TABLE public.weather (
    id serial,
    location_id integer,
	cur_temp integer,
    max_temp integer,
    min_temp integer ,
    rain integer,
    humidity integer ,
    wind integer ,
    weather_date date
);

CREATE TABLE public.loc_table (
    id serial,
    state_code integer ,
    state_name character varying(30) ,
    district_code integer ,
    district_name character varying(30) ,
    block_code integer ,
    block_name character varying(30),
	village_code integer,
	village_name character varying(30)
);

CREATE TABLE public.users (
    id serial,
    location_id integer,
    sel_lang character varying(10),
    user_name character varying(40),
    user_mobile character varying(10),
    mob_imei_no character varying(15),
    mob_model character varying(30),
	mob_os  character varying(20),
    os_version character varying(5),
	registered_on  timestamp  default NOW()
);


CREATE TABLE public.feedback (
    id serial,
    location_id integer,
    farmer_name character varying(30),	
    state_name character varying(30),
    district_name character varying(30),
    block_name character varying(30),
    mobile_num character varying(10),
    age integer,
    gender character varying(1),
    education character varying(50),
    landholding_type character varying(50),
    farming_type character varying(50),
    landholding_area character varying(10),
    wheat_area character varying(10) ,
    rice_area character varying(10) ,
    sugarcane_area character varying(10),
    mustard_area character varying(10),
    maize_area character varying(10) ,
    potato_area character varying(10),
    fodder_area character varying(10),
    vegetable_area character varying(10),
    animal_husbandry character varying(100),
    poultry_farming character varying(3),
    fish_farming character varying(3),
    horticultural_crops character varying(10),
    bulletin_received character varying(3),
    sources character varying(100),
    bulletin_timely_issued character varying(3) ,	
    feedback_for_bulletin_date date,
    bulletin_useful character varying(3),	
    bulletin_not_useful character varying(100) ,
    advice_not_useful character varying(100) ,
	useful_agri_operations character varying(100),
    other_info_req character varying(100) ,
    how_much_useful character varying(100) ,
    shared_w_others character varying(3),
    economic_benefits character varying(50),
	avg_production_lost character varying(50) ,
    ratings integer NOT NULL,
	farmer_email character varying(50),
	submitted_on timestamp default now()
);
