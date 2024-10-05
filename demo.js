const columns = ["patient_name","address","gender","age","phone_number"];

  const keyColumn = "patient_id";

function generateSCD1MergeSQL(stageTable, targetable,columns,keycolumn) {

  const condition = columns.map(col => stage.${col} != target.${col}).join(' OR ');

  const setClause = columns.map(col => target.${col} = stage.${col}).join(', ');

  const columnList = columns.join(' , ');
  
  const valueList = columns.map(col => stage.${col}).join(' , ');

  return 

`
    MERGE INTO \`${targetTable}\` AS target
    USING \`${stageTable}\` AS stage
    ON target.${keyColumn} = stage.${keyColumn}
    WHEN MATCHED AND (${condition}) THEN
      UPDATE SET target.${setClause} = stage.${setClause}
    WHEN NOT MATCHED THEN
      INSERT (${keyColumn}, ${columnList})
      VALUES (stage.${keyColumn}, ${valueList});
  `;
}

module.exports = { generateSCD1MergeSQL };