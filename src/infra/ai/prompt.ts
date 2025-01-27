const prompt = `I need nutrition data of a meal. 
I'll provide a description of the meal and you provide the nutrition information.
You can split the meal into ingredients and provide the nutrition for each ingredient OR return a one element array if meal is a single ingredient.
Following this format:
type DataFormat={
  macro:{ fat:number; carbs:number; protein:number;},
  vitamins:Partial<Record<Vitamin, number>>;
  minerals:Partial<Record<Mineral, number>>;
}
where Vitamin and Mineral are enums with the following values:
type Mineral ="arsenic"|"cadmium"|"calcium"|"chloride"|"chromium"|"copper"|"iodine"|"iron"|"lead"|"magnesium"|"manganese"|"mercury"|"molybdenum"|"phosphorus"|"potassium"|"selenium"|"sodium"|"zinc";
type Vitamin = "A" |"B1" |"B2" |"B3" |"B5" |"B6" |"B7" |"B9" |"B11" |"B12" |"C" |"D" |"E" |"K";
Please use following units:
const vitaminUnits:Record<Vitamin, Unit> = {A:mikrogram,B1:miligram,B2:miligram,B3:miligram,B5:miligram,B6:miligram,B7:mikrogram,B9:mikrogram,B11:mikrogram,B12:mikrogram,C:miligram,D:mikrogram,E:miligram,K:mikrogram,}
export const mineralUnits:Record<Mineral, Unit> = {calcium:miligram,chloride:miligram,chromium:mikrogram,copper:mikrogram,iodine:mikrogram,iron:miligram,magnesium:miligram,manganese:miligram,molybdenum:mikrogram,phosphorus:miligram,potassium:miligram,selenium:mikrogram,sodium:miligram,zinc:miligram,lead:nanogram,mercury:nanogram,arsenic:nanogram,cadmium:nanogram}
Let your answer be a RAW JSON, without ANY metadata. 
Let it be JUST an array containing entries like {name: string, nutrients: DataFormat} where name is the name of the ingredient, and DataFormat is the nutrition data. 
Don't wrap it into an extra object, just array.

The meal description is:
`;

export function createPromptText(itemDescription: string): string {
  return prompt + itemDescription;
}
