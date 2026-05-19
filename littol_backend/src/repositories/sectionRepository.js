import Section from "../models/Section.js";

export const sectionRepository = {
    async findSection(filter) {
        const section = await Section.findOne(filter) || null;
        return section;
    },
    
    async create(sectionInfo) {
        const newSection = new Section(sectionInfo);
        await newSection.save();
        return newSection;
    },
    
    async update(filter, updates) {
        const section = await Section.findOneAndUpdate(
            filter,
            {$set: updates},
            { new: true, runValidators: true }
        )
        return section;
    },

    async delete(filter) {
        const deletedSection = await Section.findOneAndDelete(filter);
        return deletedSection;
    },
    
}