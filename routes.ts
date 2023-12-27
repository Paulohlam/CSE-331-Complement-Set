import { Request, Response } from "express";
import { compact_list, explode_array } from "./list";
import { Query, tokenize, parse } from "./query";
import { evaluate } from "./eval";


/**
 * Handles request for /find, which retrieves all the numbers matching the
 * description given.
 */
export function findNumbers(req: Request, res: Response) {
  const text = first(req.query.text);
  if (text === undefined) {
    res.status(500).send('required argument "text" missing');
    return;
  }

  let query: Query|undefined = undefined;
  try {
    query = parse(explode_array(tokenize(text)));
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send('parse error: ' + err.message);
      return;
    }
    throw err;
  }

  const min = first(req.query.min);
  if (min === undefined) {
    res.status(500).send('required argument "min" missing');
    return;
  }

  const minVal = parseInt(min);
  if (isNaN(minVal)) {
    res.status(500).send('required argument "min" is not a valid number');
    return;
  }

  const max = first(req.query.max);
  if (max === undefined) {
    res.status(500).send('required argument "max" missing');
    return;
  }

  const maxVal = parseInt(max);
  if (isNaN(maxVal)) {
    res.status(500).send('required argument "max" is not a valid number');
    return;
  }

  // TODO (5f): once arbitrary ranges are supported, remove this if statement
  //            and switch to the ones below.
  if (minVal !== 1 || maxVal !== 100) {
    res.status(500).send('the only supported min-max range is 1-100');
    return;
  }
  //if (maxVal < minVal) {
  //  res.status(500).send(`min (${minVal}) should be smaller than max $(${maxVal})`);
  //  return;
  //} else if (maxVal - minVal > 1e6) {
  //  res.status(500).send(`min-max range must be smaller than 1m (not ${maxVal-minVal})`);
  //  return;
  //}

  const results = evaluate(query, minVal, maxVal);
  // TODO: - (1e) change the following to use .getNumbers()
  //       - (5e): add range params minVal, maxVal to following .getNumbers() call
  res.json({results: compact_list(results.getNumbers())});
}


// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
function first(param: any): string|undefined {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
}
