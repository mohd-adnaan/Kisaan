export default {
    feedback_tab: 'Feedback',
    feedbackTitle: 'Feedback',
    submit: 'Submit',
    name: 'Name',
    state: 'State',
    district: 'District',
    block: 'Block',
    mobile: 'Mobile / Whatsapp number',
    incomplete: 'All questions are mandatory. Please answer them and then submit the form.',
    form: {
        "feedback_for_bulletin_date": { q: 'Issue date of the Bulletin for which feedback is being given', type: 'Date' },
        "bulletin_useful": { q: 'Was the advisory bulletin effective/useful for agricultural purposes?', type: 'Radio Button', options: [{label: 'Yes'}, {label: 'No'}] },
        "bulletin_not_useful": { q: 'If Bulletin was not useful, what was the reason?', type: 'Radio Button', options: [{label: 'Irrelevant'}, {label: "Relevant but couldn't follow"}, {label: 'Weather forecast was not accurate'}, {label: "Didn't see advisory timely"}, {label: 'Other reason'}] },
        "bulletin_effective_part": { q: 'Which part of the bulletin was most effective?', type: 'Radio Button', options: [{label: 'Weather forecast'}, {label: 'Weather based Crop advisory'}, {label: 'Insect/Disease related information'},{label: 'Soil moisture based irrigation advisory'},{label: 'Wind and rainfall based fertilizer/insecticide/pesticide advisory'},{label: 'Impact based advisory on extreme weather events/hazards'}] },
        "useful_agri_operations": { q: 'Bulletin was useful for which agricultural operations?', type: 'Radio Button', options: [{label:'Field preparation'}, {label:'Sowing/Transplanting'}, {label:'Irrigation'}, {label: 'Fertilizer application'}, {label:'Insecticide/pesticide/weedicide'}, {label:'Harvesting/Threshing'}, {label:'Storage/transportation/marketing etc'}] },
        "opinion_weather": { q: 'What is your opinion about the weather outlook for last 5 days?', type: 'Radio Button', options: [{label:'Satisfied'}, {label:'Partially satisfied'}, {label:'Not satisfied'}] },
        "shared_w_others": { q: 'Do you share Agromet Advisory Bulletins with other farmers?', type: 'Radio Button', options: [{label: 'Yes'}, {label: 'No'}] },
        "shared_num": {q: 'If yes, then with at least how many farmers?', type: 'Text Input', max: 4 },
        "economic_benefits": { q: 'Did you get economic benefits from these advisories, if yes then how much?', type: 'Text Input', max: 50, },
        "other_info": { q: 'Please mention, if any other information is required in Agromet Advisory Bulletins?', type: 'Text Input', max: 50, },
        "ratings": { q: 'Your rating about the Agromet Advisory Bulletin', type: 'Ratings' }
    },
};
