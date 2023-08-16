using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TourPackageMicroservice.Models.Context;
using TourPackageMicroservice.Interfaces;
using TourPackageMicroservice.Exceptions;

namespace TourPackageMicroservice.Models
{
    public class DestinationRepo : IRepo<Destination,int>
    {
        private readonly TourContext _context;

        public DestinationRepo(TourContext context)
        {
            _context = context;
        }

        public async Task<ICollection<Destination>> GetAll()
        {
            if (_context.Destinations != null)
            {
                return await _context.Destinations.ToListAsync();
            }
            else
            {
                return new List<Destination>();
            }
        }

        public async Task<Destination> Get(int id)
        {
            if (_context.Destinations != null)
            {
                return await _context.Destinations.FindAsync(id);
            }
            else
            {
                throw new DatabaseEmptyException("Database is empty");
            }
        }

        public async Task<Destination> Add(Destination destination)
        {
            if (_context.Destinations != null)
            {
                _context.Destinations.Add(destination);
                await _context.SaveChangesAsync();
                return destination;
            }
            else
            {
                throw new DatabaseEmptyException("Database is empty");
            }
        }

        public async Task<Destination> Update(Destination destination)
        {
            if (_context.Destinations != null)
            {
                var existingDestination = _context.Destinations.FirstOrDefault(d => d.DestinationId == destination.DestinationId);
                if (existingDestination != null)
                {
                    existingDestination.DestinationCityName = destination.DestinationCityName;
                    existingDestination.Country = destination.Country;
                    await _context.SaveChangesAsync();
                    return destination;
                }
                else
                {
                    throw new DestinationNotFoundException("Destination not found.");
                }
            }
            else
            {
                throw new DatabaseEmptyException("Database is empty");
            }
        }

        public async Task<Destination> Delete(int id)
        {
            if (_context.Destinations != null)
            {
                var destination = await _context.Destinations.FindAsync(id);
                if (destination != null)
                {
                    _context.Destinations.Remove(destination);
                    await _context.SaveChangesAsync();
                    return destination;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                throw new DatabaseEmptyException("Database is empty");
            }
        }
    }
}


