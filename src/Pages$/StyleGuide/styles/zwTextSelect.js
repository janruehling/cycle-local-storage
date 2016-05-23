import { zwTextSelect } from 'StyleFn'

const results = [
  {
    'key': 'A._T._STILL_UNIVERSITY_KIRKSVILLE_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'A. T. Still University Kirksville College of Osteopathic Medicine'
  },
  {
    'key': 'A.T._STILL_UNIVERSITY_SCHOOL_OF_OSTEOPATHIC_MEDICINE_IN_ARIZONA',
    'value': 'A.T. Still University School of Osteopathic Medicine in Arizona'
  },
  {
    'key': 'ALABAMA_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Alabama College of Osteopathic Medicine'
  },
  {
    'key': 'ALBANY_MEDICAL_COLLEGE',
    'value': 'Albany Medical College'
  },
  {
    'key': 'ALBERT_EINSTEIN_COLLEGE_OF_MEDICINE_AT_YESHIVA_UNIVERSITY',
    'value': 'Albert Einstein College of Medicine at Yeshiva University'
  },
  {
    'key': 'ALPERT_MEDICAL_SCHOOL_AT_BROWN_UNIVERSITY',
    'value': 'Alpert Medical School at Brown University'
  },
  {
    'key': 'BAYLOR_COLLEGE_OF_MEDICINE',
    'value': 'Baylor College of Medicine'
  },
  {
    'key': 'BOONSHOFT_SCHOOL_OF_MEDICINE_AT_WRIGHT_STATE_UNIVERSITY',
    'value': 'Boonshoft School of Medicine at Wright State University'
  },
  {
    'key': 'BOSTON_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Boston University School of Medicine'
  },
  {
    'key': 'CALIFORNIA_NORTHSTATE_UNIVERSITY_COLLEGE_OF_MEDICINE',
    'value': 'California Northstate University College of Medicine'
  },
  {
    'key': 'CAMPBELL_UNIVERSITY_SCHOOL_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Campbell University School of Osteopathic Medicine'
  },
  {
    'key': 'CASE_WESTERN_RESERVE_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Case Western Reserve University School of Medicine'
  },
  {
    'key': 'CENTRAL_MICHIGAN_UNIVERSITY_COLLEGE_OF_MEDICINE',
    'value': 'Central Michigan University College of Medicine'
  },
  {
    'key': 'CHARLES_R._DREW_UNIVERSITY_OF_MEDICINE_AND_SCIENCE',
    'value': 'Charles R. Drew University of Medicine and Science'
  },
  {
    'key': 'CLEVELAND_CLINIC_LERNER_COLLEGE_OF_MEDICINE',
    'value': 'Cleveland Clinic Lerner College of Medicine'
  },
  {
    'key': 'COLLEGE_OF_OSTEOPATHIC_MEDICINE_OF_THE_PACIFIC',
    'value': 'College of Osteopathic Medicine of the Pacific'
  },
  {
    'key': 'COLLEGE_OF_OSTEOPATHIC_MEDICINE_OF_THE_PACIFIC,_NORTHWEST',
    'value': 'College of Osteopathic Medicine of the Pacific, Northwest'
  },
  {
    'key': 'COLUMBIA_UNIVERSITY_COLLEGE_OF_PHYSICIANS_AND_SURGEONS',
    'value': 'Columbia University College of Physicians and Surgeons'
  },
  {
    'key': 'COOPER_MEDICAL_SCHOOL_OF_ROWAN_UNIVERSITY',
    'value': 'Cooper Medical School of Rowan University'
  },
  {
    'key': 'CREIGHTON_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Creighton University School of Medicine'
  },
  {
    'key': 'DARTMOUTH_GEISEL_SCHOOL_OF_MEDICINE',
    'value': 'Dartmouth Geisel School of Medicine'
  },
  {
    'key': 'DAVID_GEFFEN_SCHOOL_OF_MEDICINE_AT_UCLA',
    'value': 'David Geffen School of Medicine at UCLA'
  },
  {
    'key': 'DELL_MEDICAL_SCHOOL_AT_THE_UNIVERSITY_OF_TEXAS_AT_AUSTIN',
    'value': 'Dell Medical School at The University of Texas at Austin'
  },
  {
    'key': 'DES_MOINES_UNIVERSITY_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Des Moines University College of Osteopathic Medicine'
  },
  {
    'key': 'DREXEL_UNIVERSITY_COLLEGE_OF_MEDICINE',
    'value': 'Drexel University College of Medicine'
  },
  {
    'key': 'DUKE_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Duke University School of Medicine'
  },
  {
    'key': 'EAST_TENNESSEE_STATE_UNIVERSITY_JAMES_H._QUILLEN_COLLEGE_OF_MEDICINE',
    'value': 'East Tennessee State University James H. Quillen College of Medicine'
  },
  {
    'key': 'EASTERN_VIRGINIA_MEDICAL_SCHOOL',
    'value': 'Eastern Virginia Medical School'
  },
  {
    'key': 'EDWARD_VIA_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Edward Via College of Osteopathic Medicine'
  },
  {
    'key': 'EDWARD_VIA_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Edward Via College of Osteopathic Medicine'
  },
  {
    'key': 'EDWARD_VIA_COLLEGE_OF_OSTEOPATHIC_MEDICINE_-_CAROLINAS_CAMPUS',
    'value': 'Edward Via College of Osteopathic Medicine - Carolinas Campus'
  },
  {
    'key': 'EMORY_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Emory University School of Medicine'
  },
  {
    'key': 'FLORIDA_ATLANTIC_UNIVERSITY_CHARLES_E._SCHMIDT_COLLEGE_OF_MEDICINE',
    'value': 'Florida Atlantic University Charles E. Schmidt College of Medicine'
  },
  {
    'key': 'FLORIDA_INTERNATIONAL_UNIVERSITY_HERBERT_WERTHEIM_COLLEGE_OF_MEDICINE',
    'value': 'Florida International University Herbert Wertheim College of Medicine'
  },
  {
    'key': 'FLORIDA_STATE_UNIVERSITY_COLLEGE_OF_MEDICINE',
    'value': 'Florida State University College of Medicine'
  },
  {
    'key': 'FRANK_H._NETTER_M.D._SCHOOL_OF_MEDICINE_AT_QUINNIPIAC_UNIVERSITY',
    'value': 'Frank H. Netter M.D. School of Medicine at Quinnipiac University'
  },
  {
    'key': 'GEORGE_WASHINGTON_UNIVERSITY_MEDICAL_SCHOOL',
    'value': 'George Washington University Medical School'
  },
  {
    'key': 'GEORGETOWN_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Georgetown University School of Medicine'
  },
  {
    'key': 'GEORGIA_REGENTS_UNIVERSITY_MEDICAL_COLLEGE_OF_GEORGIA',
    'value': 'Georgia Regents University Medical College of Georgia'
  },
  {
    'key': 'HARVARD_MEDICAL_SCHOOL',
    'value': 'Harvard Medical School'
  },
  {
    'key': 'HOFSTRA_UNIVERSITY_NORTH_SHORE–LIJ_SCHOOL_OF_MEDICINE',
    'value': 'Hofstra University North Shore–LIJ School of Medicine'
  },
  {
    'key': 'HOWARD_UNIVERSITY_COLLEGE_OF_MEDICINE',
    'value': 'Howard University College of Medicine'
  },
  {
    'key': 'ICAHN_SCHOOL_OF_MEDICINE_AT_MOUNT_SINAI',
    'value': 'Icahn School of Medicine at Mount Sinai'
  },
  {
    'key': 'INDIANA_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Indiana University School of Medicine'
  },
  {
    'key': 'JOAN_C._EDWARDS_SCHOOL_OF_MEDICINE_AT_MARSHALL_UNIVERSITY',
    'value': 'Joan C. Edwards School of Medicine at Marshall University'
  },
  {
    'key': 'JOHNS_HOPKINS_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Johns Hopkins University School of Medicine'
  },
  {
    'key': 'KANSAS_CITY_UNIVERSITY_OF_MEDICINE_AND_BIOSCIENCES_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Kansas City University of Medicine and Biosciences College of Osteopathic Medicine'
  },
  {
    'key': 'KECK_SCHOOL_OF_MEDICINE_OF_UNIVERSITY_OF_SOUTHERN_CALIFORNIA',
    'value': 'Keck School of Medicine of University of Southern California'
  },
  {
    'key': 'LAKE_ERIE_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Lake Erie College of Osteopathic Medicine'
  },
  {
    'key': 'LAKE_ERIE_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Lake Erie College of Osteopathic Medicine'
  },
  {
    'key': 'LIBERTY_UNIVERSITY_COLLEGE_OF_OSTEOPATHIC_MEDICINE_(LUCOM)',
    'value': 'Liberty University College of Osteopathic Medicine (LUCOM)'
  },
  {
    'key': 'LINCOLN_MEMORIAL_UNIVERSITY_DEBUSK_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Lincoln Memorial University DeBusk College of Osteopathic Medicine'
  },
  {
    'key': 'LOMA_LINDA_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Loma Linda University School of Medicine'
  },
  {
    'key': 'LOUISIANA_STATE_UNIVERSITY_SCHOOL_OF_MEDICINE_IN_NEW_ORLEANS',
    'value': 'Louisiana State University School of Medicine in New Orleans'
  },
  {
    'key': 'LOUISIANA_STATE_UNIVERSITY_SCHOOL_OF_MEDICINE_IN_SHREVEPORT',
    'value': 'Louisiana State University School of Medicine in Shreveport'
  },
  {
    'key': 'LOYOLA_UNIVERSITY_CHICAGO_STRITCH_SCHOOL_OF_MEDICINE',
    'value': 'Loyola University Chicago Stritch School of Medicine'
  },
  {
    'key': 'MARIAN_UNIVERSITY_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Marian University College of Osteopathic Medicine'
  },
  {
    'key': 'MAYO_CLINIC_COLLEGE_OF_MEDICINE',
    'value': 'Mayo Clinic College of Medicine'
  },
  {
    'key': 'MEDICAL_COLLEGE_OF_WISCONSIN',
    'value': 'Medical College of Wisconsin'
  },
  {
    'key': 'MEDICAL_UNIVERSITY_OF_SOUTH_CAROLINA_COLLEGE_OF_MEDICINE',
    'value': 'Medical University of South Carolina College of Medicine'
  },
  {
    'key': 'MEHARRY_MEDICAL_COLLEGE_SCHOOL_OF_MEDICINE',
    'value': 'Meharry Medical College School of Medicine'
  },
  {
    'key': 'MERCER_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Mercer University School of Medicine'
  },
  {
    'key': 'MICHIGAN_STATE_UNIVERSITY_COLLEGE_OF_HUMAN_MEDICINE',
    'value': 'Michigan State University College of Human Medicine'
  },
  {
    'key': 'MICHIGAN_STATE_UNIVERSITY_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Michigan State University College of Osteopathic Medicine'
  },
  {
    'key': 'MIDWESTERN_UNIVERSITY_ARIZONA_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Midwestern University Arizona College of Osteopathic Medicine'
  },
  {
    'key': 'MIDWESTERN_UNIVERSITY_CHICAGO_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Midwestern University Chicago College of Osteopathic Medicine'
  },
  {
    'key': 'MOREHOUSE_SCHOOL_OF_MEDICINE',
    'value': 'Morehouse School of Medicine'
  },
  {
    'key': 'NEW_MEXICO_STATE_UNIVERSITY\'S_BURRELL_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'New Mexico State University\'s Burrell College of Osteopathic Medicine'
  },
  {
    'key': 'NEW_YORK_INSTITUTE_OF_TECHNOLOGY_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'New York Institute of Technology College of Osteopathic Medicine'
  },
  {
    'key': 'NEW_YORK_MEDICAL_COLLEGE',
    'value': 'New York Medical College'
  },
  {
    'key': 'NEW_YORK_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'New York University School of Medicine'
  },
  {
    'key': 'NORTHEAST_OHIO_MEDICAL_UNIVERSITY_COLLEGE_OF_MEDICINE',
    'value': 'Northeast Ohio Medical University College of Medicine'
  },
  {
    'key': 'NORTHWESTERN_UNIVERSITY_FEINBERG_SCHOOL_OF_MEDICINE',
    'value': 'Northwestern University Feinberg School of Medicine'
  },
  {
    'key': 'NOVA_SOUTHEASTERN_UNIVERSITY_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Nova Southeastern University College of Osteopathic Medicine'
  },
  {
    'key': 'OAKLAND_UNIVERSITY_WILLIAM_BEAUMONT_SCHOOL_OF_MEDICINE',
    'value': 'Oakland University William Beaumont School of Medicine'
  },
  {
    'key': 'OHIO_UNIVERSITY_HERITAGE_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Ohio University Heritage College of Osteopathic Medicine'
  },
  {
    'key': 'OKLAHOMA_STATE_UNIVERSITY_CENTER_FOR_HEALTH_SCIENCES_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Oklahoma State University Center for Health Sciences College of Osteopathic Medicine'
  },
  {
    'key': 'OREGON_HEALTH_&_SCIENCE_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Oregon Health & Science University School of Medicine'
  },
  {
    'key': 'PACIFIC_NORTHWEST_UNIVERSITY_OF_HEALTH_SCIENCES',
    'value': 'Pacific Northwest University of Health Sciences'
  },
  {
    'key': 'PENNSYLVANIA_STATE_UNIVERSITY_COLLEGE_OF_MEDICINE',
    'value': 'Pennsylvania State University College of Medicine'
  },
  {
    'key': 'PERELMAN_SCHOOL_OF_MEDICINE_AT_THE_UNIVERSITY_OF_PENNSYLVANIA',
    'value': 'Perelman School of Medicine at the University of Pennsylvania'
  },
  {
    'key': 'PHILADELPHIA_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Philadelphia College of Osteopathic Medicine'
  },
  {
    'key': 'PHILADELPHIA_COLLEGE_OF_OSTEOPATHIC_MEDICINE_-_GEORGIA_CAMPUS',
    'value': 'Philadelphia College of Osteopathic Medicine - Georgia Campus'
  },
  {
    'key': 'PONCE_SCHOOL_OF_MEDICINE',
    'value': 'Ponce School of Medicine'
  },
  {
    'key': 'ROCKY_VISTA_UNIVERSITY_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Rocky Vista University College of Osteopathic Medicine'
  },
  {
    'key': 'ROSALIND_FRANKLIN_UNIVERSITY_-_CHICAGO_MEDICAL_SCHOOL',
    'value': 'Rosalind Franklin University - Chicago Medical School'
  },
  {
    'key': 'ROWAN_UNIVERSITY_SCHOOL_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Rowan University School of Osteopathic Medicine'
  },
  {
    'key': 'RUSH_MEDICAL_COLLEGE',
    'value': 'Rush Medical College'
  },
  {
    'key': 'RUTGERS_NEW_JERSEY_MEDICAL_SCHOOL',
    'value': 'Rutgers New Jersey Medical School'
  },
  {
    'key': 'RUTGERS_ROBERT_WOOD_JOHNSON_MEDICAL_SCHOOL',
    'value': 'Rutgers Robert Wood Johnson Medical School'
  },
  {
    'key': 'SAINT_LOUIS_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Saint Louis University School of Medicine'
  },
  {
    'key': 'SAN_JUAN_BAUTISTA_SCHOOL_OF_MEDICINE',
    'value': 'San Juan Bautista School of Medicine'
  },
  {
    'key': 'SANFORD_SCHOOL_OF_MEDICINE_OF_THE_UNIVERSITY_OF_SOUTH_DAKOTA',
    'value': 'Sanford School of Medicine of the University of South Dakota'
  },
  {
    'key': 'SIDNEY_KIMMEL_MEDICAL_COLLEGE_AT_THOMAS_JEFFERSON_UNIVERSITY',
    'value': 'Sidney Kimmel Medical College at Thomas Jefferson University'
  },
  {
    'key': 'SOUTHERN_ILLINOIS_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Southern Illinois University School of Medicine'
  },
  {
    'key': 'STANFORD_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Stanford University School of Medicine'
  },
  {
    'key': 'STATE_UNIVERSITY_OF_NEW_YORK_DOWNSTATE_MEDICAL_CENTER_COLLEGE_OF_MEDICINE',
    'value': 'State University of New York Downstate Medical Center College of Medicine'
  },
  {
    'key': 'STATE_UNIVERSITY_OF_NEW_YORK_UPSTATE_MEDICAL_UNIVERSITY',
    'value': 'State University of New York Upstate Medical University'
  },
  {
    'key': 'STONY_BROOK_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Stony Brook University School of Medicine'
  },
  {
    'key': 'TEMPLE_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Temple University School of Medicine'
  },
  {
    'key': 'TEXAS_A&M_HEALTH_SCIENCE_CENTER_COLLEGE_OF_MEDICINE',
    'value': 'Texas A&M Health Science Center College of Medicine'
  },
  {
    'key': 'TEXAS_TECH_UNIVERSITY_HEALTH_SCIENCES_CENTER_PAUL_L._FOSTER_SCHOOL_OF_MEDICINE',
    'value': 'Texas Tech University Health Sciences Center Paul L. Foster School of Medicine'
  },
  {
    'key': 'TEXAS_TECH_UNIVERSITY_HEALTH_SCIENCES_CENTER_SCHOOL_OF_MEDICINE',
    'value': 'Texas Tech University Health Sciences Center School of Medicine'
  },
  {
    'key': 'THE_BRODY_SCHOOL_OF_MEDICINE_AT_EAST_CAROLINA_UNIVERSITY',
    'value': 'The Brody School of Medicine at East Carolina University'
  },
  {
    'key': 'THE_COMMONWEALTH_MEDICAL_COLLEGE',
    'value': 'The Commonwealth Medical College'
  },
  {
    'key': 'THE_OHIO_STATE_UNIVERSITY_COLLEGE_OF_MEDICINE',
    'value': 'The Ohio State University College of Medicine'
  },
  {
    'key': 'TOURO_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Touro College of Osteopathic Medicine'
  },
  {
    'key': 'TOURO_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Touro College of Osteopathic Medicine'
  },
  {
    'key': 'TOURO_UNIVERSITY_CALIFORNIA_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Touro University California College of Osteopathic Medicine'
  },
  {
    'key': 'TOURO_UNIVERSITY_NEVADA_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'Touro University Nevada College of Osteopathic Medicine'
  },
  {
    'key': 'TUFTS_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Tufts University School of Medicine'
  },
  {
    'key': 'TULANE_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Tulane University School of Medicine'
  },
  {
    'key': 'UC_DAVIS_SCHOOL_OF_MEDICINE',
    'value': 'UC Davis School of Medicine'
  },
  {
    'key': 'UC_RIVERSIDE_SCHOOL_OF_MEDICINE',
    'value': 'UC Riverside School of Medicine'
  },
  {
    'key': 'UNIFORMED_SERVICES_UNIVERSITY_OF_THE_HEALTH_SCIENCES_F._EDWARD_HEBERT_SCHOOL_OF_MEDICINE',
    'value': 'Uniformed Services University of the Health Sciences F. Edward Hebert School of Medicine'
  },
  {
    'key': 'UNIVERSIDAD_CENTRAL_DEL_CARIBE_SCHOOL_OF_MEDICINE',
    'value': 'Universidad Central del Caribe School of Medicine'
  },
  {
    'key': 'UNIVERSITY_AT_BUFFALO_SCHOOL_OF_MEDICINE_AND_BIOMEDICAL_SCIENCES',
    'value': 'University at Buffalo School of Medicine and Biomedical Sciences'
  },
  {
    'key': 'UNIVERSITY_OF_ALABAMA_SCHOOL_OF_MEDICINE',
    'value': 'University of Alabama School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_ARIZONA_COLLEGE_OF_MEDICINE',
    'value': 'University of Arizona College of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_ARKANSAS_FOR_MEDICAL_SCIENCES/UAMS_COLLEGE_OF_MEDICINE',
    'value': 'University of Arkansas for Medical Sciences/UAMS College of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_CALIFORNIA,_IRVINE_SCHOOL_OF_MEDICINE',
    'value': 'University of California, Irvine School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_CALIFORNIA,_SAN_DIEGO_SCHOOL_OF_MEDICINE',
    'value': 'University of California, San Diego School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_CALIFORNIA,_SAN_FRANCISCO_SCHOOL_OF_MEDICINE',
    'value': 'University of California, San Francisco School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_CENTRAL_FLORIDA_COLLEGE_OF_MEDICINE',
    'value': 'University of Central Florida College of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_CHICAGO_PRITZKER_SCHOOL_OF_MEDICINE',
    'value': 'University of Chicago Pritzker School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_CINCINNATI_COLLEGE_OF_MEDICINE',
    'value': 'University of Cincinnati College of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_COLORADO_SCHOOL_OF_MEDICINE',
    'value': 'University of Colorado School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_CONNECTICUT_SCHOOL_OF_MEDICINE',
    'value': 'University of Connecticut School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_FLORIDA_COLLEGE_OF_MEDICINE',
    'value': 'University of Florida College of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_HAWAII_AT_MANOA_JOHN_A._BURNS_SCHOOL_OF_MEDICINE',
    'value': 'University of Hawaii at Manoa John A. Burns School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_ILLINOIS_COLLEGE_OF_MEDICINE',
    'value': 'University of Illinois College of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_IOWA_ROY_J._AND_LUCILLE_A._CARVER_COLLEGE_OF_MEDICINE',
    'value': 'University of Iowa Roy J. and Lucille A. Carver College of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_KANSAS_SCHOOL_OF_MEDICINE',
    'value': 'University of Kansas School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_KENTUCKY_COLLEGE_OF_MEDICINE',
    'value': 'University of Kentucky College of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_LOUISVILLE_SCHOOL_OF_MEDICINE',
    'value': 'University of Louisville School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_MARYLAND_SCHOOL_OF_MEDICINE',
    'value': 'University of Maryland School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_MASSACHUSETTS_MEDICAL_SCHOOL',
    'value': 'University of Massachusetts Medical School'
  },
  {
    'key': 'UNIVERSITY_OF_MIAMI_LEONARD_M._MILLER_SCHOOL_OF_MEDICINE',
    'value': 'University of Miami Leonard M. Miller School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_MICHIGAN_MEDICAL_SCHOOL',
    'value': 'University of Michigan Medical School'
  },
  {
    'key': 'UNIVERSITY_OF_MINNESOTA_MEDICAL_SCHOOL',
    'value': 'University of Minnesota Medical School'
  },
  {
    'key': 'UNIVERSITY_OF_MISSISSIPPI_SCHOOL_OF_MEDICINE',
    'value': 'University of Mississippi School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_MISSOURI-COLUMBIA_SCHOOL_OF_MEDICINE',
    'value': 'University of Missouri-Columbia School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_MISSOURI–KANSAS_CITY_SCHOOL_OF_MEDICINE',
    'value': 'University of Missouri–Kansas City School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_NEBRASKA_COLLEGE_OF_MEDICINE',
    'value': 'University of Nebraska College of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_NEVADA_SCHOOL_OF_MEDICINE',
    'value': 'University of Nevada School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_NEW_ENGLAND_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'University of New England College of Osteopathic Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_NEW_MEXICO_SCHOOL_OF_MEDICINE',
    'value': 'University of New Mexico School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_NORTH_CAROLINA_SCHOOL_OF_MEDICINE',
    'value': 'University of North Carolina School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_NORTH_DAKOTA_SCHOOL_OF_MEDICINE_AND_HEALTH_SCIENCES',
    'value': 'University of North Dakota School of Medicine and Health Sciences'
  },
  {
    'key': 'UNIVERSITY_OF_NORTH_TEXAS_HEALTH_SCIENCE_CENTER_TEXAS_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'University of North Texas Health Science Center Texas College of Osteopathic Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_OKLAHOMA_COLLEGE_OF_MEDICINE',
    'value': 'University of Oklahoma College of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_PIKEVILLE_KENTUCKY_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'University of Pikeville Kentucky College of Osteopathic Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_PITTSBURGH_SCHOOL_OF_MEDICINE',
    'value': 'University of Pittsburgh School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_PUERTO_RICO_SCHOOL_OF_MEDICINE',
    'value': 'University of Puerto Rico School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_ROCHESTER_SCHOOL_OF_MEDICINE_AND_DENTISTRY',
    'value': 'University of Rochester School of Medicine and Dentistry'
  },
  {
    'key': 'UNIVERSITY_OF_SOUTH_ALABAMA_COLLEGE_OF_MEDICINE',
    'value': 'University of South Alabama College of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_SOUTH_CAROLINA_SCHOOL_OF_MEDICINE',
    'value': 'University of South Carolina School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_SOUTH_FLORIDA_COLLEGE_OF_MEDICINE',
    'value': 'University of South Florida College of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_TENNESSEE_COLLEGE_OF_MEDICINE',
    'value': 'University of Tennessee College of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_TEXAS_MEDICAL_BRANCH_SCHOOL_OF_MEDICINE',
    'value': 'University of Texas Medical Branch School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_TEXAS_MEDICAL_SCHOOL_AT_HOUSTON',
    'value': 'University of Texas Medical School at Houston'
  },
  {
    'key': 'UNIVERSITY_OF_TEXAS_RIO_GRANDE_VALLEY_SCHOOL_OF_MEDICINE',
    'value': 'University of Texas Rio Grande Valley School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_TEXAS_SCHOOL_OF_MEDICINE_AT_SAN_ANTONIO',
    'value': 'University of Texas School of Medicine at San Antonio'
  },
  {
    'key': 'UNIVERSITY_OF_TEXAS_SOUTHWESTERN_MEDICAL_SCHOOL_AT_DALLAS',
    'value': 'University of Texas Southwestern Medical School at Dallas'
  },
  {
    'key': 'UNIVERSITY_OF_TOLEDO_COLLEGE_OF_MEDICINE',
    'value': 'University of Toledo College of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_UTAH_SCHOOL_OF_MEDICINE',
    'value': 'University of Utah School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_VERMONT_COLLEGE_OF_MEDICINE',
    'value': 'University of Vermont College of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_VIRGINIA_SCHOOL_OF_MEDICINE',
    'value': 'University of Virginia School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_WASHINGTON_SCHOOL_OF_MEDICINE',
    'value': 'University of Washington School of Medicine'
  },
  {
    'key': 'UNIVERSITY_OF_WISCONSIN_SCHOOL_OF_MEDICINE_AND_PUBLIC_HEALTH',
    'value': 'University of Wisconsin School of Medicine and Public Health'
  },
  {
    'key': 'VCU_SCHOOL_OF_MEDICINE,_MEDICAL_COLLEGE_OF_VIRGINIA_HEALTH_SCIENCES_DIVISION',
    'value': 'VCU School of Medicine, Medical College of Virginia Health Sciences Division'
  },
  {
    'key': 'VANDERBILT_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Vanderbilt University School of Medicine'
  },
  {
    'key': 'VIRGINIA_TECH_CARILION_SCHOOL_OF_MEDICINE_AND_RESEARCH_INSTITUTE',
    'value': 'Virginia Tech Carilion School of Medicine and Research Institute'
  },
  {
    'key': 'WAKE_FOREST_SCHOOL_OF_MEDICINE',
    'value': 'Wake Forest School of Medicine'
  },
  {
    'key': 'WASHINGTON_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Washington University School of Medicine'
  },
  {
    'key': 'WAYNE_STATE_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'Wayne State University School of Medicine'
  },
  {
    'key': 'WEILL_CORNELL_MEDICAL_COLLEGE',
    'value': 'Weill Cornell Medical College'
  },
  {
    'key': 'WEST_VIRGINIA_SCHOOL_OF_OSTEOPATHIC_MEDICINE',
    'value': 'West Virginia School of Osteopathic Medicine'
  },
  {
    'key': 'WEST_VIRGINIA_UNIVERSITY_SCHOOL_OF_MEDICINE',
    'value': 'West Virginia University School of Medicine'
  },
  {
    'key': 'WESTERN_MICHIGAN_UNIVERSITY_HOMER_STRYKER_M.D._SCHOOL_OF_MEDICINE',
    'value': 'Western Michigan University Homer Stryker M.D. School of Medicine'
  },
  {
    'key': 'WESTERN_UNIVERSITY_OF_HEALTH_SCIENCES',
    'value': 'Western University of Health Sciences'
  },
  {
    'key': 'WILLIAM_CAREY_UNIVERSITY_COLLEGE_OF_OSTEOPATHIC_MEDICINE',
    'value': 'William Carey University College of Osteopathic Medicine'
  },
  {
    'key': 'YALE_SCHOOL_OF_MEDICINE',
    'value': 'Yale School of Medicine'
  }
]

const children = [{
  name: '',
  fn: zwTextSelect({
    type: 'text',
    label: 'Default Skin',
    placeholder: 'Placeholder'
  }),
  style: {
    marginRight: '20px'
  }
}, {
  name: '',
  fn: zwTextSelect({
    type: 'text',
    value: 'Al',
    results: results,
    focus: true
  }),
  style: {
    marginRight: '20px'
  }
}, {
  name: '',
  fn: zwTextSelect({
    type: 'text',
    label: 'Narrow Skin',
    placeholder: 'Placeholder',
    skin: 'narrow'
  }),
  style: {
    marginRight: '20px'
  }
}, {
  name: '',
  fn: zwTextSelect({
    label: 'Narrow Skin',
    type: 'text',
    value: 'Al',
    skin: 'narrow',
    results: results,
    focus: true
  }),
  style: {
    marginRight: '20px'
  }
}]

const inputTypes = {
  name: 'zwTextSelect',
  children: children
}

export default inputTypes
