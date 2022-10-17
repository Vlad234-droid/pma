export * from './formExpression';
export * from './formPreparetion';
export * from './formModification';

// example dsl in description and text properties
// {auth.role:LineManager,admin;auth.work_level:WL3} // not used
// {request.review:OBJECTIVE}
// {request.rating:overall_rating}
// {auth.permission.read:Colleague}
// {auth.permission.write:LineManager}
// {auth.permission.read:Colleague,LineManager;auth.permission.write:LineManager}
// {tag.block:open}
// {tag.block:close}
// {dependency.dependent.key:test;dependency.dependent.value:yes}
