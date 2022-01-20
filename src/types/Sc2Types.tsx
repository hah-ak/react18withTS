interface keyTypes{
    league_id:Number,
    queue_id:Number,
    season_id:Number,
    team_type:Number
}
interface ArrayEle {
    id:Number,
    division:divisionType
}

interface divisionType{
    id:Number,
    ladder_id:Number,
    member_count:Number
}

interface sc2 {
    key:keyTypes,
    tier:Array<ArrayEle>,
    _links:selfType
}

interface selfType{
    self:{href:URL}
}

export {sc2}