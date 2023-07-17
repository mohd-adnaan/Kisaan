<?php

include_once("config.php");

$json = file_get_contents('php://input'); 	
$obj = json_decode($json,true);

$sel_gp_code =  mysqli_real_escape_string( $dbconn, $obj['sel_gp_code']);
$sel_gp_name =  mysqli_real_escape_string( $dbconn, $obj['sel_gp_name']);	
$unique_hh_code=time();

$resp_name=mysqli_real_escape_string($dbconn,$obj['resp_name']);  if(!$resp_name)  {$resp_name='null' ; }
$religion=mysqli_real_escape_string($dbconn,$obj['religion']);  if(!$religion)  {$religion='null' ; }
$caste=mysqli_real_escape_string($dbconn,$obj['caste']);  if(!$caste)  {$caste='null' ; }
$address=mysqli_real_escape_string($dbconn,$obj['address']);  if(!$address)  {$address='null' ; }
$landmark=mysqli_real_escape_string($dbconn,$obj['landmark']);  if(!$landmark)  {$landmark='null' ; }
$sex=mysqli_real_escape_string($dbconn,$obj['sex']);  if(!$sex)  {$sex='null' ; }
$relationship=mysqli_real_escape_string($dbconn,$obj['relationship']);  if(!$relationship)  {$relationship='null' ; }
$mobile=mysqli_real_escape_string($dbconn,$obj['mobile']);  if(!$mobile)  {$mobile='null' ; }
$idcard=mysqli_real_escape_string($dbconn,$obj['idcard']);  if(!$idcard)  {$idcard='null' ; }
$idcardnum=mysqli_real_escape_string($dbconn,$obj['idcardnum']);  if(!$idcardnum)  {$idcardnum='null' ; }

// $resi_since =  mysqli_real_escape_string( $dbconn, $obj['resi_since']); //integar
// if(!$resi_since) {$resi_since = 'null';}
// $house_own_type =  mysqli_real_escape_string( $dbconn, $obj['house_own_type']); //text
// $house_rent =  mysqli_real_escape_string( $dbconn, $obj['houserent']);  //int
// if(!$house_rent) {$house_rent = 'null';}
// $bplcard =  mysqli_real_escape_string( $dbconn, $obj['bplcard']); //boolean
// if(!$bplcard) {$bplcard = 'null';}
// $rationcard =  mysqli_real_escape_string( $dbconn, $obj['rationcard']); //boolean
// if(!$rationcard) {$rationcard = 'null';}

$latitude =  (mysqli_real_escape_string( $dbconn, $obj['latitude'])); //numeric, 
$longitude =  mysqli_real_escape_string( $dbconn, $obj['longitude']); //numeric, 
$accuracy =  mysqli_real_escape_string( $dbconn, $obj['accuracy']); //numeric,  
//$loc_geom='';

//$loc_geom="ST_GeomFromText('POINT(".$longitude." ".$latitude.")', 4326)";

$num_img =  mysqli_real_escape_string( $dbconn, $obj['num_img']); //int,  

$photob640 ='null';
$pic1time ='null'; 
$latitude1 ='null';
$longitude1 ='null';
$accuracy1 ='null';
//$loc_geom1='null';



if($latitude1){
	
$photob640 =  mysqli_real_escape_string( $dbconn, $obj['photob640']); //text, 
$pic1time = mysqli_real_escape_string( $dbconn, $obj['pic1time']);  //text, 
$latitude1 = trim(mysqli_real_escape_string( $dbconn, $obj['latitude1'])); //numeric
$longitude1 =  trim(mysqli_real_escape_string( $dbconn, $obj['longitude1'])); //numeric
$accuracy1 =  trim(mysqli_real_escape_string( $dbconn, $obj['accuracy1'])); //numeric

$photo1=$photob640;
//$photo1data = explode(',', $photob640,2);
//$photo1 = base64_decode($photo1data[1]);


//$latitude1 = "'".$latitude1."'";	
//$longitude1 = "'".$longitude1."'";	
//$accuracy1 = "'".$accuracy1."'";			
//$pic1time="'".$pic1time."'";	

//$loc_geom1="ST_GeomFromText('POINT(".$longitude1." ".$latitude1.")', 4326)";
}

if($num_img<2){
$photob641 ='null';
$pic2time ='null'; 
$latitude2 ='null';
$longitude2 ='null';
$accuracy2 ='null';
//$loc_geom2='null';
$photo2='null';
}
else{
$photob641 =  mysqli_real_escape_string( $dbconn, $obj['photob641']); //text
$pic2time = mysqli_real_escape_string( $dbconn, $obj['pic2time']);  //text, 
$latitude2 =  trim(mysqli_real_escape_string( $dbconn, $obj['latitude2']));  //numeric,
$longitude2 =  trim(mysqli_real_escape_string( $dbconn, $obj['longitude2']));  //numeric,
$accuracy2 =  mysqli_real_escape_string( $dbconn, $obj['accuracy2']);  //numeric,

//$photo2data = explode(',', $photob641,2);
//$photo2 = base64_decode($photo2data[1]);

$photo2=$photob640;

//$latitude2 = "'".$latitude2."'";	
//$longitude2 = "'".$longitude2."'";	
//$accuracy2 = "'".$accuracy2."'";			
//$pic2time="'".$pic2time."'";	

//$loc_geom2="ST_GeomFromText('POINT(".$longitude2." ".$latitude2.")', 4326)";
}

//$timestamp =  mysqli_real_escape_string( $dbconn, $obj['timestamp']); //text,

$resp_hh_id=mysqli_real_escape_string($dbconn,$obj['resp_hh_id']);  if(!$resp_hh_id)  {$resp_hh_id='null' ; }
$resp_head_name=mysqli_real_escape_string($dbconn,$obj['resp_head_name']);  if(!$resp_head_name)  {$resp_head_name='null' ; }
$resp_head_gender=mysqli_real_escape_string($dbconn,$obj['resp_head_gender']);  if(!$resp_head_gender)  {$resp_head_gender='null' ; }
$resp_category=mysqli_real_escape_string($dbconn,$obj['resp_category']);  if(!$resp_category)  {$resp_category='null' ; }
$povertysts=mysqli_real_escape_string($dbconn,$obj['povertysts']);  if(!$povertysts)  {$povertysts='null' ; }

$toilet_avail =  mysqli_real_escape_string( $dbconn, $obj['toilet_avail']);  //boolean
if(!$toilet_avail) {$toilet_avail = 'null';}
$toilet_sch =  mysqli_real_escape_string( $dbconn, $obj['toilet_sch']);  //boolean
if(!$toilet_sch) {$toilet_sch = 'null';}

$toilet_sch_name=mysqli_real_escape_string($dbconn,$obj['toilet_sch_name']);  if(!$toilet_sch_name)  {$toilet_sch_name='null' ; }
$toilet_amt=mysqli_real_escape_string($dbconn,$obj['toilet_amt']);  if(!$toilet_amt)  {$toilet_amt='null' ; }
$drainage_house=mysqli_real_escape_string($dbconn,$obj['drainage_house']);  if(!$drainage_house)  {$drainage_house='null' ; }
$waste_coll=mysqli_real_escape_string($dbconn,$obj['waste_coll']);  if(!$waste_coll)  {$waste_coll='null' ; }
$compost_pit=mysqli_real_escape_string($dbconn,$obj['compost_pit']);  if(!$compost_pit)  {$compost_pit='null' ; }
$biogas_plant=mysqli_real_escape_string($dbconn,$obj['biogas_plant']);  if(!$biogas_plant)  {$biogas_plant='null' ; }
$annual_income=mysqli_real_escape_string($dbconn,$obj['annual_income']);  if(!$annual_income)  {$annual_income='null' ; }
$own_house=mysqli_real_escape_string($dbconn,$obj['own_house']);  if(!$own_house)  {$own_house='null' ; }
$house_type=mysqli_real_escape_string($dbconn,$obj['house_type']);  if(!$house_type)  {$house_type='null' ; }
$house_roof=mysqli_real_escape_string($dbconn,$obj['house_roof']);  if(!$house_roof)  {$house_roof='null' ; }
$house_wall=mysqli_real_escape_string($dbconn,$obj['house_wall']);  if(!$house_wall)  {$house_wall='null' ; }
$house_sch=mysqli_real_escape_string($dbconn,$obj['house_sch']);  if(!$house_sch)  {$house_sch='null' ; }
$house_age=mysqli_real_escape_string($dbconn,$obj['house_age']);  if(!$house_age)  {$house_age='null' ; }
$house_cond=mysqli_real_escape_string($dbconn,$obj['house_cond']);  if(!$house_cond)  {$house_cond='null' ; }
$fam_members=mysqli_real_escape_string($dbconn,$obj['fam_members']);  if(!$fam_members)  {$fam_members='null' ; }
$migrated=mysqli_real_escape_string($dbconn,$obj['migrated']);  if(!$migrated)  {$migrated='null' ; }
$migrated_member=mysqli_real_escape_string($dbconn,$obj['migrated_member']);  if(!$migrated_member)  {$migrated_member='null' ; }
$migrated_months=mysqli_real_escape_string($dbconn,$obj['migrated_months']);  if(!$migrated_months)  {$migrated_months='null' ; }
$migration_since=mysqli_real_escape_string($dbconn,$obj['migration_since']);  if(!$migration_since)  {$migration_since='null' ; }
$num_pmjandhan=mysqli_real_escape_string($dbconn,$obj['num_pmjandhan']);  if(!$num_pmjandhan)  {$num_pmjandhan='null' ; }
$num_pmujjwala=mysqli_real_escape_string($dbconn,$obj['num_pmujjwala']);  if(!$num_pmujjwala)  {$num_pmujjwala='null' ; }
$num_pmawas=mysqli_real_escape_string($dbconn,$obj['num_pmawas']);  if(!$num_pmawas)  {$num_pmawas='null' ; }
$num_sukanya=mysqli_real_escape_string($dbconn,$obj['num_sukanya']);  if(!$num_sukanya)  {$num_sukanya='null' ; }
$num_mudra=mysqli_real_escape_string($dbconn,$obj['num_mudra']);  if(!$num_mudra)  {$num_mudra='null' ; }
$num_pmjivanjyoti=mysqli_real_escape_string($dbconn,$obj['num_pmjivanjyoti']);  if(!$num_pmjivanjyoti)  {$num_pmjivanjyoti='null' ; }
$num_pmsuraksha=mysqli_real_escape_string($dbconn,$obj['num_pmsuraksha']);  if(!$num_pmsuraksha)  {$num_pmsuraksha='null' ; }
$num_fasalbima=mysqli_real_escape_string($dbconn,$obj['num_fasalbima']);  if(!$num_fasalbima)  {$num_fasalbima='null' ; }
$num_atalpension=mysqli_real_escape_string($dbconn,$obj['num_atalpension']);  if(!$num_atalpension)  {$num_atalpension='null' ; }
$num_kaushalv=mysqli_real_escape_string($dbconn,$obj['num_kaushalv']);  if(!$num_kaushalv)  {$num_kaushalv='null' ; }
$num_krishisinchai=mysqli_real_escape_string($dbconn,$obj['num_krishisinchai']);  if(!$num_krishisinchai)  {$num_krishisinchai='null' ; }
$num_janaushadi=mysqli_real_escape_string($dbconn,$obj['num_janaushadi']);  if(!$num_janaushadi)  {$num_janaushadi='null' ; }
$num_sbmtoilet=mysqli_real_escape_string($dbconn,$obj['num_sbmtoilet']);  if(!$num_sbmtoilet)  {$num_sbmtoilet='null' ; }
$num_soilhc=mysqli_real_escape_string($dbconn,$obj['num_soilhc']);  if(!$num_soilhc)  {$num_soilhc='null' ; }
$num_ladli=mysqli_real_escape_string($dbconn,$obj['num_ladli']);  if(!$num_ladli)  {$num_ladli='null' ; }
$num_janani=mysqli_real_escape_string($dbconn,$obj['num_janani']);  if(!$num_janani)  {$num_janani='null' ; }
$num_kisancc=mysqli_real_escape_string($dbconn,$obj['num_kisancc']);  if(!$num_kisancc)  {$num_kisancc='null' ; }
$water_supp=mysqli_real_escape_string($dbconn,$obj['water_supp']);  if(!$water_supp)  {$water_supp='null' ; }
$water_supp_dur=mysqli_real_escape_string($dbconn,$obj['water_supp_dur']);  if(!$water_supp_dur)  {$water_supp_dur='null' ; }
$handpump=mysqli_real_escape_string($dbconn,$obj['handpump']);  if(!$handpump)  {$handpump='null' ; }
$openwell=mysqli_real_escape_string($dbconn,$obj['openwell']);  if(!$openwell)  {$openwell='null' ; }
$waterstoragemode=mysqli_real_escape_string($dbconn,$obj['waterstoragemode']);  if(!$waterstoragemode)  {$waterstoragemode='null' ; }
$anyoth_watersource=mysqli_real_escape_string($dbconn,$obj['anyoth_watersource']);  if(!$anyoth_watersource)  {$anyoth_watersource='null' ; }
$elec_connection=mysqli_real_escape_string($dbconn,$obj['elec_connection']);  if(!$elec_connection)  {$elec_connection='null' ; }
$elec_supp_dur=mysqli_real_escape_string($dbconn,$obj['elec_supp_dur']);  if(!$elec_supp_dur)  {$elec_supp_dur='null' ; }
$lighting=mysqli_real_escape_string($dbconn,$obj['lighting']);  if(!$lighting)  {$lighting='null' ; }
$lighting_oth=mysqli_real_escape_string($dbconn,$obj['lighting_oth']);  if(!$lighting_oth)  {$lighting_oth='null' ; }
$cooking=mysqli_real_escape_string($dbconn,$obj['cooking']);  if(!$cooking)  {$cooking='null' ; }
$cooking_oth=mysqli_real_escape_string($dbconn,$obj['cooking_oth']);  if(!$cooking_oth)  {$cooking_oth='null' ; }
$chullahtype=mysqli_real_escape_string($dbconn,$obj['chullahtype']);  if(!$chullahtype)  {$chullahtype='null' ; }
$appliances_oth=mysqli_real_escape_string($dbconn,$obj['appliances_oth']);  if(!$appliances_oth)  {$appliances_oth='null' ; }
$land_holding=mysqli_real_escape_string($dbconn,$obj['land_holding']);  if(!$land_holding)  {$land_holding='null' ; }
$land_area=mysqli_real_escape_string($dbconn,$obj['land_area']);  if(!$land_area)  {$land_area='null' ; }
$land_cultiv=mysqli_real_escape_string($dbconn,$obj['land_cultiv']);  if(!$land_cultiv)  {$land_cultiv='null' ; }
$land_uncultiv=mysqli_real_escape_string($dbconn,$obj['land_uncultiv']);  if(!$land_uncultiv)  {$land_uncultiv='null' ; }
$land_irrig=mysqli_real_escape_string($dbconn,$obj['land_irrig']);  if(!$land_irrig)  {$land_irrig='null' ; }
$land_unirrig=mysqli_real_escape_string($dbconn,$obj['land_unirrig']);  if(!$land_unirrig)  {$land_unirrig='null' ; }
$land_barren=mysqli_real_escape_string($dbconn,$obj['land_barren']);  if(!$land_barren)  {$land_barren='null' ; }
$chem_fert=mysqli_real_escape_string($dbconn,$obj['chem_fert']);  if(!$chem_fert)  {$chem_fert='null' ; }
$chem_fert_quant=mysqli_real_escape_string($dbconn,$obj['chem_fert_quant']);  if(!$chem_fert_quant)  {$chem_fert_quant='null' ; }
$chem_insect=mysqli_real_escape_string($dbconn,$obj['chem_insect']);  if(!$chem_insect)  {$chem_insect='null' ; }
$chem_insect_quant=mysqli_real_escape_string($dbconn,$obj['chem_insect_quant']);  if(!$chem_insect_quant)  {$chem_insect_quant='null' ; }
$chem_weed=mysqli_real_escape_string($dbconn,$obj['chem_weed']);  if(!$chem_weed)  {$chem_weed='null' ; }
$chem_weed_quant=mysqli_real_escape_string($dbconn,$obj['chem_weed_quant']);  if(!$chem_weed_quant)  {$chem_weed_quant='null' ; }
$org_manure=mysqli_real_escape_string($dbconn,$obj['org_manure']);  if(!$org_manure)  {$org_manure='null' ; }
$org_manure_quant=mysqli_real_escape_string($dbconn,$obj['org_manure_quant']);  if(!$org_manure_quant)  {$org_manure_quant='null' ; }
$irrigation=mysqli_real_escape_string($dbconn,$obj['irrigation']);  if(!$irrigation)  {$irrigation='null' ; }
$irrig_system=mysqli_real_escape_string($dbconn,$obj['irrig_system']);  if(!$irrig_system)  {$irrig_system='null' ; }
$cropname=mysqli_real_escape_string($dbconn,$obj['cropname']);  if(!$cropname)  {$cropname='null' ; }
$area_crop_prev=mysqli_real_escape_string($dbconn,$obj['area_crop_prev']);  if(!$area_crop_prev)  {$area_crop_prev='null' ; }
$area_crop_prod=mysqli_real_escape_string($dbconn,$obj['area_crop_prod']);  if(!$area_crop_prod)  {$area_crop_prod='null' ; }
$cow=mysqli_real_escape_string($dbconn,$obj['cow']);  if(!$cow)  {$cow='null' ; }
$buffalo=mysqli_real_escape_string($dbconn,$obj['buffalo']);  if(!$buffalo)  {$buffalo='null' ; }
$goat=mysqli_real_escape_string($dbconn,$obj['goat']);  if(!$goat)  {$goat='null' ; }
$sheep=mysqli_real_escape_string($dbconn,$obj['sheep']);  if(!$sheep)  {$sheep='null' ; }
$calves=mysqli_real_escape_string($dbconn,$obj['calves']);  if(!$calves)  {$calves='null' ; }
$bullocks=mysqli_real_escape_string($dbconn,$obj['bullocks']);  if(!$bullocks)  {$bullocks='null' ; }
$poultry=mysqli_real_escape_string($dbconn,$obj['poultry']);  if(!$poultry)  {$poultry='null' ; }
$ducks=mysqli_real_escape_string($dbconn,$obj['ducks']);  if(!$ducks)  {$ducks='null' ; }
$other_livestock=mysqli_real_escape_string($dbconn,$obj['other_livestock']);  if(!$other_livestock)  {$other_livestock='null' ; }
$shelter_livestock=mysqli_real_escape_string($dbconn,$obj['shelter_livestock']);  if(!$shelter_livestock)  {$shelter_livestock='null' ; }
$avg_milk_prod=mysqli_real_escape_string($dbconn,$obj['avg_milk_prod']);  if(!$avg_milk_prod)  {$avg_milk_prod='null' ; }
$animal_waste=mysqli_real_escape_string($dbconn,$obj['animal_waste']);  if(!$animal_waste)  {$animal_waste='null' ; }
$problems=mysqli_real_escape_string($dbconn,$obj['problems']);  if(!$problems)  {$problems='null' ; }
$problem_suggestion=mysqli_real_escape_string($dbconn,$obj['problem_suggestion']);  if(!$problem_suggestion)  {$problem_suggestion='null' ; }
$radio=mysqli_real_escape_string($dbconn,$obj['radio']);  if(!$radio)  {$radio='null' ; }
$telephone=mysqli_real_escape_string($dbconn,$obj['telephone']);  if(!$telephone)  {$telephone='null' ; }
$solar=mysqli_real_escape_string($dbconn,$obj['solar']);  if(!$solar)  {$solar='null' ; }
$tv=mysqli_real_escape_string($dbconn,$obj['tv']);  if(!$tv)  {$tv='null' ; }
$computer=mysqli_real_escape_string($dbconn,$obj['computer']);  if(!$computer)  {$computer='null' ; }
$stove=mysqli_real_escape_string($dbconn,$obj['stove']);  if(!$stove)  {$stove='null' ; }
$voc_trng_cntr=mysqli_real_escape_string($dbconn,$obj['voc_trng_cntr']);  if(!$voc_trng_cntr)  {$voc_trng_cntr='null' ; }
$issues=mysqli_real_escape_string($dbconn,$obj['issues']);  if(!$issues)  {$issues='null' ; }
$expectations=mysqli_real_escape_string($dbconn,$obj['expectations']);  if(!$expectations)  {$expectations='null' ; }
$suggestions=mysqli_real_escape_string($dbconn,$obj['suggestions']);  if(!$suggestions)  {$suggestions='null' ; }
$anyremarks=mysqli_real_escape_string($dbconn,$obj['anyremarks']);  if(!$anyremarks)  {$anyremarks='null' ; }
$obs_time=mysqli_real_escape_string($dbconn,$obj['timestamp']);  if(!$obs_time)  {$obs_time='null' ; }
$surveyor_name=mysqli_real_escape_string($dbconn,$obj['surveyor_name']);  if(!$surveyor_name)  {$surveyor_name='null' ; }
$surveyor_mobile=mysqli_real_escape_string($dbconn,$obj['surveyor_mobile']);  if(!$surveyor_mobile)  {$surveyor_mobile='null' ; }
$obs_sts=mysqli_real_escape_string($dbconn,$obj['obs_sts']);  if(!$obs_sts)  {$obs_sts='null' ; }



	/* $sql ="WITH recent_sts_id AS (INSERT INTO public.project_status(projcode,photo1,photo1_time,obs_date,loc_geom1,loc_geom2,photo2,photo2_time,projstatus,surveyor_cmnt,obs_by,last_updated_by,longitude1,latitude1,longitude2,latitude2,accuracy1,accuracy2)
	VALUES ('".$projcode."','".$photo1."','".$pic1time."','".$creationTime."',".$loc_geom1.",".$loc_geom2.",'".$photo2."',".$pic2time.",
	'".$status."','".$remark."','".$addedby."','".$addedby."','".$longitude1."','".$latitude1."',".$longitude2.",".$latitude2.",'"
	.$accuracy1."',".$accuracy2.") returning id ) ";
	$sql=$sql."UPDATE public.project_master
	SET isgeotagged='t', loc_geom=".$loc_geom1.", last_updated_by='".$addedby."',projstatus='".$status."', recent_sts_id=(SELECT id FROM recent_sts_id) 
	WHERE projcode='".$projcode."'";
	} */
	
$sql="INSERT INTO hh_survey_master(unique_hh_code, sel_gp_code, sel_gp_name, username, resp_name, religion, caste, address, landmark, sex, relationship, mobile, idcard, idcardnum, latitude, longitude, accuracy, num_img, photob640, pic1time, latitude1, longitude1, accuracy1, photob641, pic2time, latitude2, longitude2, accuracy2, resp_hh_id, resp_head_name, resp_head_gender, resp_category, povertysts, toilet_avail, toilet_sch, toilet_sch_name, toilet_amt, drainage_house, waste_coll, compost_pit, biogas_plant, annual_income, own_house, house_type, house_roof, house_wall, house_sch, house_age, house_cond, fam_members, migrated, migrated_member, migrated_months, migration_since, num_pmjandhan, num_pmujjwala, num_pmawas, num_sukanya, num_mudra, num_pmjivanjyoti, num_pmsuraksha, num_fasalbima, num_atalpension, num_kaushalv, num_krishisinchai, num_janaushadi, num_sbmtoilet, num_soilhc, num_ladli, num_janani, num_kisancc, water_supp, water_supp_dur, handpump, openwell, waterstoragemode, anyoth_watersource, elec_connection, elec_supp_dur, lighting, lighting_oth, cooking, cooking_oth, chullahtype, appliances_oth, land_holding, land_area, land_cultiv, land_uncultiv, land_irrig, land_unirrig, land_barren, chem_fert, chem_fert_quant, chem_insect, chem_insect_quant, chem_weed, chem_weed_quant, org_manure, org_manure_quant, irrigation, irrig_system, cropname, area_crop_prev, area_crop_prod, cow, buffalo, goat, sheep, calves, bullocks, poultry, ducks, other_livestock, shelter_livestock, avg_milk_prod, animal_waste, problems, problem_suggestion, radio, telephone, solar, tv, computer, stove, voc_trng_cntr, issues, expectations, suggestions, anyremarks, obs_time, surveyor_name, surveyor_mobile, obs_sts) VALUES ('".$unique_hh_code."','".$sel_gp_code."','".$sel_gp_name."','".$username."','".$resp_name."','".$religion."','".$caste."','".$address."','".$landmark."','".$sex."','".$relationship."','".$mobile."','".$idcard."','".$idcardnum."','".$latitude."','".$longitude."','".$accuracy."','".$num_img."','".$photob640."','".$pic1time."','".$latitude1."','".$longitude1."','".$accuracy1."','".$photob641."','".$pic2time."','".$latitude2."','".$longitude2."','".$accuracy2."','".$resp_hh_id."','".$resp_head_name."','".$resp_head_gender."','".$resp_category."','".$povertysts."','".$toilet_avail."','".$toilet_sch."','".$toilet_sch_name."','".$toilet_amt."','".$drainage_house."','".$waste_coll."','".$compost_pit."','".$biogas_plant."','".$annual_income."','".$own_house."','".$house_type."','".$house_roof."','".$house_wall."','".$house_sch."','".$house_age."','".$house_cond."','".$fam_members."','".$migrated."','".$migrated_member."','".$migrated_months."','".$migration_since."','".$num_pmjandhan."','".$num_pmujjwala."','".$num_pmawas."','".$num_sukanya."','".$num_mudra."','".$num_pmjivanjyoti."','".$num_pmsuraksha."','".$num_fasalbima."','".$num_atalpension."','".$num_kaushalv."','".$num_krishisinchai."','".$num_janaushadi."','".$num_sbmtoilet."','".$num_soilhc."','".$num_ladli."','".$num_janani."','".$num_kisancc."','".$water_supp."','".$water_supp_dur."','".$handpump."','".$openwell."','".$waterstoragemode."','".$anyoth_watersource."','".$elec_connection."','".$elec_supp_dur."','".$lighting."','".$lighting_oth."','".$cooking."','".$cooking_oth."','".$chullahtype."','".$appliances_oth."','".$land_holding."','".$land_area."','".$land_cultiv."','".$land_uncultiv."','".$land_irrig."','".$land_unirrig."','".$land_barren."','".$chem_fert."','".$chem_fert_quant."','".$chem_insect."','".$chem_insect_quant."','".$chem_weed."','".$chem_weed_quant."','".$org_manure."','".$org_manure_quant."','".$irrigation."','".$irrig_system."','".$cropname."','".$area_crop_prev."','".$area_crop_prod."','".$cow."','".$buffalo."','".$goat."','".$sheep."','".$calves."','".$bullocks."','".$poultry."','".$ducks."','".$other_livestock."','".$shelter_livestock."','".$avg_milk_prod."','".$animal_waste."','".$problems."','".$problem_suggestion."','".$radio."','".$telephone."','".$solar."','".$tv."','".$computer."','".$stove."','".$voc_trng_cntr."','".$issues."','".$expectations."','".$suggestions."','".$anyremarks."','".$obs_time."','".$surveyor_name."','".$surveyor_mobile."','".$obs_sts."')";

$result = mysqli_query($dbconn,$sql);
$infoString='';
$response=[];
if ($result) {
			$infoString .="Survey Data Successfully Saved!" ;
			$response['hh_code']=$unique_hh_code;
			$response['success']='true';
		//	$response['updateInfo']=$infoString ;
		//   $response='{"success": true, "updateInfo": "' . $infoString . '"}';
}
else {
			$response['lastError']=mysqli_last_error($dbconn);
			$infoString .="      Error while saving the data!  ".$sql;
			$response['success']='Error';
		//	$response['updateInfo']=$infoString ;
		//   $response='{"success": false, "updateInfo":"' . $infoString . '"}';
}
$response['updateInfo']=$infoString ;
echo json_encode($response);
//echo $response;

$dbconn->close();
?>