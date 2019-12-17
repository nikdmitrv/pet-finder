import React, { Component } from 'react';

class FilterForm extends Component {
    state = {
        breedOptions: [
            'affenpinscher', 'african', 'airedale', 'akita',
            'appenzeller', 'basenji', 'beagle', 'bluetick',
            'borzoi', 'bouvier', 'boxer', 'brabancon',
            'briard', 'buhund', 'bulldog', 'bullterrier',
            'cairn', 'cattledog', 'chihuahua', 'chow',
            'clumber', 'cockapoo', 'collie', 'coonhound',
            'corgi', 'cotondetulear', 'dachshund', 'dalmatian',
            'dane', 'deerhound', 'dhole', 'dingo',
            'doberman', 'elkhound', 'entlebucher', 'eskimo',
            'frise', 'germanshepherd', 'greyhound', 'groenendael',
            'hound', 'husky', 'keeshond', 'kelpie',
            'komondor', 'kuvasz', 'labrador', 'leonberg',
            'lhasa', 'malamute', 'malinois', 'maltese',
            'mastiff', 'mexicanhairless', 'mix', 'mountain',
            'newfoundland', 'otterhound', 'papillon', 'pekinese',
            'pembroke', 'pinscher', 'pitbull', 'pointer',
            'pomeranian', 'poodle', 'pug', 'puggle',
            'pyrenees', 'redbone', 'retriever', 'ridgeback',
            'rottweiler', 'saluki', 'samoyed', 'schipperke',
            'schnauzer', 'setter', 'sheepdog', 'shiba',
            'shihtzu', 'spaniel', 'springer', 'stbernard',
            'terrier', 'vizsla', 'waterdog', 'weimaraner',
            'whippet', 'wolfhound'
        ]
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { breed, sex, date } = event.target
        this.props.handleFiltration({
            byBreed: breed.value,
            bySex: sex.value,
            byDate: date.value,
        })
    }

    render() {
        return (
            <div  className="">
                <form onSubmit={this.handleSubmit}>
                <div class="">
                    </div>
                    <label htmlFor='sexFilterMale'>Male</label>
                    <input type='radio' name='sex' id='sexFilterMale' value='male' />
                    <label htmlFor='sexFilterFemale'>Female</label>
                    <input type='radio' name='sex' id='sexFilterFemale' value='female' />


                    <select className="custom-select"  name='breed'>
                        <option value=''>Select a breed</option>
                        {this.state.breedOptions.map((breed, index) => <option key={index} value={breed}>{breed}</option>)}
                    </select>
                    <label htmlFor='dateFilter'>Дата</label>
                    <input className="form-control" name='date' id='dateFilter' />

                    <button>Filter</button>
                </form>
            </div>
        );
    }

}


export default FilterForm;